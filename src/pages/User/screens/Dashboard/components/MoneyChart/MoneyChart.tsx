import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, HoverState } from '@devexpress/dx-react-chart';

import { useStyles } from './styles';

type ChartTab =
  | 'income'
  | 'expenses';

type ChartItem = {
  day: string;
  minus: number;
  plus: number;
}

interface Props {
  chartData: Array<ChartItem>;
}

export const MoneyChart: React.FC<Props> = ({
  chartData,
}) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = React.useState<ChartTab>('income');

  const handleChangeActiveTab = React.useCallback((event: any, tab: ChartTab) => {
    setActiveTab(tab);
  }, [setActiveTab]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={classes.paper}>
          <Tabs
            value={activeTab}
            onChange={handleChangeActiveTab}
            aria-label="simple tabs example"
          >
            <Tab label="Доходи" value="income" />
            <Tab label="Витрати" value="expenses" />
          </Tabs>
          {activeTab === 'income' && (
            <Chart
              data={chartData}
            >
              <ArgumentAxis />
              <ValueAxis />
              <BarSeries
                name="plus"
                valueField="plus"
                argumentField="day"
                color="#00b300"
              />
              <EventTracker />
              <HoverState />
            </Chart>
          )}
          {activeTab === 'expenses' && (
            <Chart
              data={chartData}
            >
              <ArgumentAxis />
              <ValueAxis />
              <BarSeries
                name="minus"
                valueField="minus"
                argumentField="day"
                color="#ff4d4d"
              />
              <EventTracker />
              <HoverState />
            </Chart>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper>
          TODO: statistic for day
        </Paper>
      </Grid>
    </Grid>
  );
}