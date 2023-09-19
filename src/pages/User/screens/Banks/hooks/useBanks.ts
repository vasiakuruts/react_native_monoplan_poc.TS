import React from 'react';
import * as Redux from 'react-redux';
import * as GlobalActions from '../../../../../store/global/actions';
import { banksAPI } from '../../../../../api';

import { BanksTableRowData } from '../Banks.types';

interface UseBanks {
  isLoading: boolean;
  banks: Bank[];
  rowAdd: (nextData: BanksTableRowData) => Promise<void>
  rowUpdate: (nextData: BanksTableRowData, prevData?: BanksTableRowData) => Promise<void>
  rowDelete: (prevData: BanksTableRowData) => Promise<void>
}

export const useBanks = (): UseBanks => {
  const dispatch = Redux.useDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [banks, setBanks] = React.useState<Bank[]>([]);

  const getBanks = React.useCallback(async () => {
    if (!isLoading) {
      setIsLoading(true);
    }

    try {
      const res = await banksAPI.getBanks();
      const banks: Bank[] = res.data;

      setBanks(banks);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading, setBanks]);

  const createBank = React.useCallback(async (nextData: BanksTableRowData) => {
    if (!isLoading) {
      setIsLoading(true);
    }

    const { type, APIKey } = nextData;
    const bank: Bank = {
      id: 'temp',
      type,
      APIKey,
    };

    let nextBanks = [
      ...banks,
      bank,
    ];
    setBanks(nextBanks);

    try {
      const res = await banksAPI.createBank(bank);

      if (res && res.data) {
        nextBanks = [...nextBanks];
        const index = nextBanks.findIndex((item: Bank) => item.id === 'temp');

        nextBanks[index] = res.data;

        setBanks(nextBanks);
      }
    } catch (error) {
      console.log(error);

      dispatch(GlobalActions.setError('The API key is not valid!'));

      nextBanks = banks.filter((item: Bank) => item.id !== 'temp');
      setBanks(nextBanks);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading, banks, setBanks]);

  const editBank = React.useCallback(async (nextData: BanksTableRowData, prevData?: BanksTableRowData) => {
    if (!isLoading) {
      setIsLoading(true);
    }

    const { id, type, APIKey } = nextData;
    let nextBanks = [
      ...banks,
    ];

    const index = nextBanks.findIndex((item: Bank) => item.id === id);
    const prevItem = {
      ...nextBanks[index],
    };
    nextBanks[index] = {
      id,
      type,
      APIKey,
    }

    setBanks(nextBanks);

    try {
      const { id, type, APIKey } = nextData;
      await banksAPI.editBank(id, { type, APIKey });
    } catch (error) {
      console.log(error);

      dispatch(GlobalActions.setError('The API key is not valid!'));

      nextBanks = [...nextBanks];
      nextBanks[index] = prevItem;
      setBanks(nextBanks);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading, setBanks, banks]);

  const deleteBank = React.useCallback(async (prevData: BanksTableRowData) => {
    if (!isLoading) {
      setIsLoading(true);
    }

    const { id } = prevData;
    let nextBanks = [
      ...banks,
    ];

    const index = nextBanks.findIndex((item: Bank) => item.id === id);
    const prevItem = {
      ...nextBanks[index],
    };
    nextBanks.splice(index, 1);

    setBanks(nextBanks);

    try {
      const { id } = prevData;
      await banksAPI.deleteBank(id);
    } catch (error) {
      console.log(error);

      nextBanks = [...nextBanks];
      nextBanks.splice(index, 0, prevItem);
      setBanks(nextBanks);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading, setBanks, banks]);

  const rowAdd = React.useCallback(async (nextData: BanksTableRowData): Promise<void> => {
    createBank(nextData);
    return Promise.resolve();
  }, [createBank]);

  const rowUpdate = React.useCallback(async (nextData: BanksTableRowData, prevData?: BanksTableRowData): Promise<void> => {
    editBank(nextData, prevData);
  }, [editBank]);

  const rowDelete = React.useCallback(async (prevData: BanksTableRowData): Promise<void> => {
    deleteBank(prevData);
    return Promise.resolve();
  }, [deleteBank]);

  React.useEffect(() => {
    getBanks();
  }, []);

  return {
    isLoading,
    banks,
    rowAdd,
    rowUpdate,
    rowDelete
  }
}