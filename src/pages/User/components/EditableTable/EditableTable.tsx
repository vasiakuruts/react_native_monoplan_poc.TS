import React from 'react';
import Grid, { GridSize } from '@material-ui/core/Grid';
import MaterialTable, { Column } from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/EditOutlined';
import Search from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from './styles';

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

interface Props<T extends object> {
  xs?: GridSize;
  md?: GridSize;
  title: string;
  columns: Column<T>[];
  data: T[];
  isLoading: boolean;
  onRowAdd?: ((newData: T) => Promise<any>) | undefined;
  onRowUpdate?: ((newData: T, oldData?: T | undefined) => Promise<any>) | undefined;
  onRowDelete?: ((oldData: T) => Promise<any>) | undefined;
}

export function EditableTable<T extends object>({
  xs = 12,
  md = 12,
  title,
  columns,
  data,
  isLoading,
  onRowAdd,
  onRowUpdate,
  onRowDelete,
}: Props<T>) {
  const classes = useStyles();

  return (
    <Grid item xs={xs} md={md} className={classes.wrapper}>
      <MaterialTable<T>
        title={title}
        columns={columns}
        data={data}
        editable={{
          onRowAdd,
          onRowUpdate,
          onRowDelete,
        }}
        icons={tableIcons as any}
        options={{
          paging: false,
          search: false,
          actionsColumnIndex: -1
        }}
      />
      {isLoading && (
        <div className={classes.container}>
          <CircularProgress className={classes.spinner} />
        </div>
      )}
    </Grid>
  );
}