import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { BANKS } from '../../../../constants';
import { EditableTable } from '../../components'

import { useBanks } from './hooks';
import { useStyles } from './styles';

const COLUMNS = [
  {
    title: 'Bank name',
    field: 'type',
    render: (data: any) => {
      const index = BANKS.findIndex((bank) => bank.id === data.type);

      return (
        <div>{index > -1 ? BANKS[index].label : 'Invalid value'}</div>
      )
    },
    editComponent: (data: any) => {
      return (
        <Select
          value={data.value}
          onChange={(event: any) => {
            const { target: { value } } = event;

            data.onRowDataChange({
              type: value,
              APIKey: data.rowData.APIKey,
            })
          }}
          style={{
            width: '100%',
          }}
        >
          <MenuItem disabled>Select bank</MenuItem>
          {BANKS.map((bank) => (
            <MenuItem value={bank.id}>{bank.label}</MenuItem>
          ))}
        </Select>
      )
    },
  },
  {
    title: 'API Key', field: 'APIKey',
  },
];

export const Banks: React.FC = () => {
  const classes = useStyles();
  const BanksHelper = useBanks();

  return (
    <div className={classes.paper}>
      <Grid container spacing={2} className={classes.tableWrapper}>
        <EditableTable<Bank>
          title="Banks"
          columns={COLUMNS}
          data={BanksHelper.banks}
          isLoading={BanksHelper.isLoading}
          onRowAdd={BanksHelper.rowAdd}
          onRowUpdate={BanksHelper.rowUpdate}
          onRowDelete={BanksHelper.rowDelete}
        />
      </Grid>
    </div>
  );
}