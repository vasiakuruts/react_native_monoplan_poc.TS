import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../store/store.types';
import { UserState } from '../../../../store/user/types';
import * as UserActions from '../../../../store/user/actions';

import { MONTHS } from './data';

type Hook = {
  month: number;
  monthLabel: string;
  onSetMonth: (month: number) => void;
}

export const useStore = (): Hook => {
  const dispatch = useDispatch();
  const user = useSelector<RootState, UserState>(state => state.user);

  const onSetMonth = (month: number) => {
    // dispatch(UserActions.setMonth(month));
  }

  return {
    month: 0,
    monthLabel: MONTHS[0],
    onSetMonth,
  }
}