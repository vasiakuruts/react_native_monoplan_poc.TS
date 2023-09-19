import * as React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';

import MaterialTable, { MTableEditField, MTableCell } from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/EditOutlined';
import Search from '@material-ui/icons/Search';

import { CategoryType, Category } from '../../../../../../store/categories/categories.types';
import { PlanningCategory } from '../../../../../../store/planning/planning.types';
import { getMonthNameByIndex } from '../../../../../../utils';

import { ProgressBar } from './components';
import { useStore, CalculatedPlanningGroup } from './useStore';
import { useStyles } from './styles';

type RouteParams = {
  year?: string;
  month?: string;
}

const CATEGORIES_COLUMNS = [
  { title: 'id', field: 'id' },
  // { title: 'name', field: 'name', editable: 'never' },
  { title: 'prognosis', field: 'prognosis' },
];

const tableIcons = {
  Add: React.forwardRef((props: any, ref) => <AddBox {...props} ref={ref} />),
  Check: React.forwardRef((props: any, ref) => <Check {...props} ref={ref} />),
  Clear: React.forwardRef((props: any, ref) => <Clear {...props} ref={ref} />),
  Delete: React.forwardRef((props: any, ref) => <DeleteOutline {...props} ref={ref} />),
  Edit: React.forwardRef((props: any, ref) => <Edit {...props} ref={ref} />),
  ResetSearch: React.forwardRef((props: any, ref) => <Clear {...props} ref={ref} />),
  Search: React.forwardRef((props: any, ref) => <Search {...props} ref={ref} />),
  SortArrow: React.forwardRef((props: any, ref) => <ArrowDownward {...props} ref={ref} />),
};

const getRenderCell = (
  classes: any,
  categories: Record<string, Category>,
) => (props: any): JSX.Element => {
  if (props.columnDef.field !== 'id') {
    return (
      <MTableCell {...props} />
    );
  }
  const name = categories[props.value] ? categories[props.value].name : 'invalid';

  return (
    <td className={classes.categoryCell}>{name}</td>
  );
}

const getRenderEditField = (
  classes: any,
  calculatedCategories: Record<string, PlanningCategory & { name: string }>,
  categories: Record<string, Category>,
) => (props: any): JSX.Element => {
  if (props.columnDef.field !== 'id') {
    return (
      <MTableEditField {...props} />
    );
  }

  return (
    <Select
      // className={classes.selectYear}
      labelId="select-category"
      id="select-category"
      value={props.value}
      displayEmpty
      onChange={(e) => props.onChange(e.target.value)}
    >
      <MenuItem disabled>Select category</MenuItem>
      {Object.values(categories).map((category) => {
        const disabled = !!calculatedCategories[category.id];

        return (
          <MenuItem
            key={`select-category-${category.id}`}
            value={category.id}
            disabled={disabled}
          >
            {category.name}
          </MenuItem>
        )
      })}
    </Select>
  );
}

const renderPrognosisTable = (
  classes: any,
  calculatedGroup: CalculatedPlanningGroup | undefined,
  onRowAdd: (data: any) => any,
  onRowUpdate: (data: any, oldData: any) => any,
  onRowDelete: (data: any) => any,
): JSX.Element | null => {

  if (!calculatedGroup) {
    return null;
  }

  return (
    <MaterialTable
      title='table'
      columns={CATEGORIES_COLUMNS as any}
      data={Object.values(calculatedGroup.categories)}
      editable={{
        onRowAdd,
        onRowUpdate,
        onRowDelete,
      }}
      icons={tableIcons as any}
      options={{
        paging: false,
        search: false,
      }}
      components={{
        EditField: getRenderEditField(classes, calculatedGroup.categories, calculatedGroup.all),
        Cell: getRenderCell(classes, calculatedGroup.all),
        Header: () => null,
      }}
    />
  );
}

const renderBalanceCard = (classes: any, type: 'income' | 'expenses', balance: number): JSX.Element => {
  const label = type === 'income'
    ? 'Income'
    : 'Expenses';
  return (
    <Card variant="outlined" className={classes.balanceCard}>
      <Typography variant="h5">{`${label} ${balance}`}</Typography>
    </Card>
  );
}

export const Month: React.FC = () => {
  const classes = useStyles();
  const params = useParams<RouteParams>();
  const Store = useStore(params.year, params.month);

  const getAddPrognosisHandler = React.useCallback((group: 'income' | 'expenses') => (data: any) => {
    const { id, prognosis } = data;
    Store.handleAddCategoryPrognosis(group, id, parseInt(prognosis));
    return Promise.resolve();
  }, []);

  const getRemovePrognosisHandler = React.useCallback((group: 'income' | 'expenses') => (data: any) => {
    const { id } = data;
    Store.handleRemoveCategoryPrognosis(group, id);
    return Promise.resolve();
  }, []);

  const getUpdatePrognosisHandler = React.useCallback((group: 'income' | 'expenses') => (data: any, oldData: any) => {
    const { id } = oldData;
    const { id: newId, prognosis } = data;
    Store.handleUpdateCategoryPrognosis(group, id, newId, parseInt(prognosis));
    return Promise.resolve();
  }, []);

  return (
    <div className={classes.paper}>
      <>
        {params.month && params.year && (
          <div className={classes.titleContainer}>
            <Typography component="h1" variant="h4">
              {`${getMonthNameByIndex(params.month)} ${params.year}`}
            </Typography>
          </div>
        )}
        {!Store.invalid && (
          <Grid container spacing={4}>
            <Grid item xs={6} md={6}>
              {renderBalanceCard(
                classes,
                'expenses',
                Store.expenses?.prognosis || 0)
              }
            </Grid>
            <Grid item xs={6} md={6}>
              {renderBalanceCard(
                classes,
                'income',
                Store.income?.prognosis || 0)
              }
            </Grid>
          </Grid>
        )}

        <Grid container spacing={4} className={classes.tableWrapper}>
          <Grid item xs={6} md={6}>
            {renderPrognosisTable(
              classes,
              Store.expenses,
              getAddPrognosisHandler('expenses'),
              getUpdatePrognosisHandler('expenses'),
              getRemovePrognosisHandler('expenses'),
            )}
          </Grid>
          <Grid item xs={6} md={6}>
            {renderPrognosisTable(
              classes,
              Store.income,
              getAddPrognosisHandler('income'),
              getUpdatePrognosisHandler('income'),
              getRemovePrognosisHandler('income'),
            )}
          </Grid>
        </Grid>
      </>
    </div>
  );
}