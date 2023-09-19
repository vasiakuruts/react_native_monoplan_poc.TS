import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import { EditableTable } from '../../components'

import { useCategories } from './hooks';
import { useStyles } from './styles';

const COLUMNS = [
  { title: 'category', field: 'name' },
];

export const Categories: React.FC = () => {
  const classes = useStyles();
  const CategoriesIncomeHelper = useCategories('income');
  const CategoriesExpensesHelper = useCategories('expenses');

  return (
    <div className={classes.paper}>
      <Grid container spacing={2} className={classes.tableWrapper}>
        <EditableTable<Category>
          xs={6}
          md={6}
          title="Expenses"
          columns={COLUMNS}
          data={CategoriesExpensesHelper.data}
          isLoading={CategoriesExpensesHelper.isLoading}
          onRowAdd={CategoriesExpensesHelper.rowAdd}
          onRowUpdate={CategoriesExpensesHelper.rowUpdate}
          onRowDelete={CategoriesExpensesHelper.rowDelete}
        />
        <EditableTable<Category>
          xs={6}
          md={6}
          title="Income"
          columns={COLUMNS}
          data={CategoriesIncomeHelper.data}
          isLoading={CategoriesIncomeHelper.isLoading}
          onRowAdd={CategoriesIncomeHelper.rowAdd}
          onRowUpdate={CategoriesIncomeHelper.rowUpdate}
          onRowDelete={CategoriesIncomeHelper.rowDelete}
        />
      </Grid>
    </div>
  );
}