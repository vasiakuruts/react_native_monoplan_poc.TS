import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import MaterialTable, { MTableEditField, MTableCell } from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/EditOutlined';
import Search from '@material-ui/icons/Search';

import { PlanningMonth } from '../../../../../../store/planning/planning.types';
import { getMonthNameByIndex } from '../../../../../../utils';

import { useStore, MonthTableRecord } from './useStore';
import { useStyles } from './styles';

type RouteParams = {
  year?: string;
}

const CATEGORIES_COLUMNS = [
  { title: 'month', field: 'month' },
  { title: 'expenses', field: 'expenses', editable: 'never' },
  { title: 'income', field: 'income', editable: 'never' },
  { title: 'categories', field: 'categoriesCount' },
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

const getRenderEditField = (
  classes: any,
  months?: Array<MonthTableRecord>,
) => (props: any): JSX.Element => {
  if (props.columnDef.field !== 'month') {
    return (
      <MTableEditField {...props} />
    );
  }

  return (
    <Select
      className={classes.selectMonth}
      labelId="select-month"
      id="select-month"
      value={props.value}
      displayEmpty
      onChange={(e) => props.onChange(e.target.value)}
    >
      <MenuItem disabled>Select month</MenuItem>
      {new Array(12).fill(0).map((_, i) => {
        const disabled = months
          ? !!months[i]
          : false;

        return (
          <MenuItem
            key={`select-month-${i}`}
            value={i}
            disabled={disabled}
          >
            {getMonthNameByIndex(`${i}`)}
          </MenuItem>
        )
      })}
    </Select>
  );
}

const getRenderCell = (classes: any, getMonthOpenHandler: (month: number) => any) => (props: any): JSX.Element => {
  if (props.columnDef.field === 'month') {
    return (
      <td className={classes.monthCell}>
        {getMonthNameByIndex(props.value)}
      </td>
    );
  }
  if (props.columnDef.tableData.columnOrder === CATEGORIES_COLUMNS.length - 1) {
    return (
      <>
        <MTableCell {...props} />
        <td className={classes.buttonCell}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={getMonthOpenHandler(props.rowData.month)}
          >
            Open
          </Button>
        </td>
      </>
    );
  }

  return (
    <MTableCell {...props} />
  );
}

export const Year: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams<RouteParams>();
  const Store = useStore(params.year);

  const getMonthOpenHandler = React.useCallback((month: number) => () => {
    history.push(`/planning/year-${params.year}/month-${month}`);
  }, [history, params.year]);

  const handleAddMonth = React.useCallback(async (data: any): Promise<void> => {
    const year = params.year ? parseInt(params.year) : NaN;
    const { month } = data;
    Store.handleCreateMonth(year, month);
    return Promise.resolve();
  }, [Store, params.year]);

  const handleRemoveMonth = React.useCallback(async (data: any): Promise<void> => {
    const year = params.year ? parseInt(params.year) : NaN;
    const { month } = data;
    Store.handleRemoveMonth(year, month);
    return Promise.resolve();
  }, [Store, params.year]);

  return (
    <div className={classes.paper}>
      <Grid container>
        {Store.invalid && (
          <Typography variant="body1" component="div">Invalid year</Typography>
        )}
        {Store.empty && (
          <div>
            <Typography variant="body1" component="div">You don't have planning months</Typography>
          </div>
        )}
        {!Store.invalid && (
          <Grid item xs={12} md={12}>
            <MaterialTable
              title={`Planning ${params.year} year`}
              columns={CATEGORIES_COLUMNS as any}
              data={Store.months}
              icons={tableIcons as any}
              editable={{
                onRowAdd: handleAddMonth,
                onRowDelete: handleRemoveMonth,
              }}
              options={{
                paging: false,
                search: false,
              }}
              components={{
                EditField: getRenderEditField(classes, Store.months),
                Cell: getRenderCell(classes, getMonthOpenHandler),
                // Header: () => null,
              }}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
}