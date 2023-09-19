import * as React from 'react';

import { MoneyChart } from './components';
import { useStore } from './useStore';
import { useStyles } from './styles';

export const Dashboard: React.FC = () => {
  const classes = useStyles();
  const Store = useStore();

  return (
    <div className={classes.paper}>
      <MoneyChart
        chartData={Store.statementGroupedByDay}
      />
    </div>
  );
}