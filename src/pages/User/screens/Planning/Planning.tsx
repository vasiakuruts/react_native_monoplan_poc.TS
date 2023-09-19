import * as React from 'react';
import { Route, useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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

import { PlanningYear } from '../../../../store/planning/planning.types';

import { Year, Month } from './screens';
import { useStore, YearTableRecord } from './useStore';
import { useStyles } from './styles';

const CATEGORIES_COLUMNS = [
  { title: 'year', field: 'year' },
  { title: 'income', field: 'income' },
  { title: 'expenses', field: 'expenses' },
  { title: 'months', field: 'monthsCount' },
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
  plans: Array<YearTableRecord>,
) => (props: any): JSX.Element => {
  if (props.columnDef.field !== 'year') {
    return (
      <MTableEditField {...props} />
    );
  }

  return (
    <Select
      className={classes.selectYear}
      labelId="select-month"
      id="select-month"
      value={props.value}
      displayEmpty
      onChange={(e) => props.onChange(e.target.value)}
    >
      <MenuItem disabled>Select year</MenuItem>
      {new Array(11).fill(0).map((_, i) => {
        const year = i + 2020;
        const disabled = plans
          ? !!plans[year]
          : false;

        return (
          <MenuItem
            key={`select-year-${year}`}
            value={year}
            disabled={disabled}
          >
            {year}
          </MenuItem>
        )
      })}
    </Select>
  );
}

const getRenderCell = (classes: any, getYearOpenHandler: (year: number) => any) => (props: any): JSX.Element => {
  if (props.columnDef.field === 'year') {
    return (
      <td className={classes.yearCell}>
        {props.value}
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
            onClick={getYearOpenHandler(props.rowData.year)}
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

export const Planning: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const Store = useStore();

  const getYearOpenHandler = React.useCallback((year: number) => () => {
    history.push(`/planning/year-${year}`);
  }, [history]);

  const handleAddYear = React.useCallback(async (data: any): Promise<void> => {
    const { year } = data;
    Store.handleCreateYear(year);
    return Promise.resolve();
  }, [Store]);

  const handleRemoveYear = React.useCallback(async (data: any): Promise<void> => {
    const { year } = data;
    Store.handleRemoveYear(year);
    return Promise.resolve();
  }, [Store]);

  return (
    <>
      <Route exact path="/planning">
        <div className={classes.paper}>
          <Grid container>
            {Store.empty && (
              <div>
                <Typography variant="body1" component="div">You don't have planning years</Typography>
              </div>
            )}
            <Grid item xs={12} md={12}>
              <MaterialTable
                title='Planning years'
                columns={CATEGORIES_COLUMNS as any}
                data={Store.plans}
                icons={tableIcons as any}
                editable={{
                  onRowAdd: handleAddYear,
                  onRowDelete: handleRemoveYear,
                }}
                options={{
                  paging: false,
                  search: false,
                }}
                components={{
                  EditField: getRenderEditField(classes, Store.plans),
                  Cell: getRenderCell(classes, getYearOpenHandler),
                  // Header: () => null,
                }}
              />
            </Grid>
          </Grid>
        </div>
      </Route>
      <Route exact path="/planning/year-:year">
        <Year />
      </Route>
      <Route exact path="/planning/year-:year/month-:month">
        <Month />
      </Route>
    </>
  );
}