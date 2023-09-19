import { useSelector } from 'react-redux';

import { RootState } from '../../../../store/store.types';
import { UserState } from '../../../../store/user/types';
import { StatementState } from '../../../../store/statement/statement.types';

type StatementGroupedByDay = {
  day: string;
  minus: number;
  plus: number;
}

type Hook = {
  statementGroupedByDay: Array<StatementGroupedByDay>;
}

export const useStore = (): Hook => {
  const statement = useSelector<RootState, StatementState>(state => state.statement);
  const user = useSelector<RootState, UserState>(state => state.user);

  const dates = new Map<string, StatementGroupedByDay>();

  const maxDays = new Date(2020, 0, 0).getDate();
  for (let i = 0; i < maxDays; i += 1) {
    const day = `${i}`;
    dates.set(day, {
      day,
      minus: 0,
      plus: 0,
    })
  }

  statement.items.forEach(({ time, amount, balance }) => {
    const m = amount / 100;
    const entry: StatementGroupedByDay = {
      day: `${new Date(time * 1000).getDate()}`,
      minus: m < 0 ? m : 0,
      plus: m > 0 ? m : 0,
    };
    const item = dates.get(entry.day);
    entry.minus += item ? item.minus : 0;
    entry.plus += item ? item.plus : 0;
    dates.set(entry.day, entry);
  });

  const statementGroupedByDay: Array<StatementGroupedByDay> = [];
  dates.forEach((value) => {
    statementGroupedByDay.push({
      ...value,
      minus: value.minus * -1,
    });
  });

  return {
    statementGroupedByDay,
  }
}