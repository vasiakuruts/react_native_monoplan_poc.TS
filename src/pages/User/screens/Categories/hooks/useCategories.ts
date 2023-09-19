import React from 'react';
import { categoriesAPI } from '../../../../../api';

import { CategoriesTableRowData } from '../Categories.types';

type RowData = CategoriesTableRowData;
type DataItem = Category;

interface UseTableCategories {
  isLoading: boolean;
  data: DataItem[];
  rowAdd: (nextData: RowData) => Promise<void>
  rowUpdate: (nextData: RowData, prevData?: RowData) => Promise<void>
  rowDelete: (prevData: RowData) => Promise<void>
}

export const useCategories = (categoryType: CategoryType): UseTableCategories => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<DataItem[]>([]);

  const getData = React.useCallback(async () => {
    if (!isLoading) {
      setIsLoading(true);
    }

    try {
      const res = await categoriesAPI.getCategories(categoryType);
      const data: DataItem[] = res.data;

      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading, setData]);

  const createDataItem = React.useCallback(async ({ name }: RowData) => {
    if (!isLoading) {
      setIsLoading(true);
    }

    const item: DataItem = {
      id: 'temp',
      name,
    };

    let nextData = [
      ...data,
      item,
    ];
    setData(nextData);

    try {
      const res = await categoriesAPI.createCategory(categoryType, item);

      if (res.data) {
        nextData = [...nextData];
        const index = nextData.findIndex((item: DataItem) => item.id === 'temp');

        nextData[index] = res.data;

        setData(nextData);
      }
    } catch (error) {
      console.log(error);

      nextData = data.filter((item: DataItem) => item.id !== 'temp');
      setData(nextData);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading, data, setData]);

  const editDataItem = React.useCallback(async ({ id, name }: RowData, prevData?: RowData) => {
    if (!isLoading) {
      setIsLoading(true);
    }

    let nextData = [
      ...data,
    ];

    const index = nextData.findIndex((item: DataItem) => item.id === id);
    const prevItem = {
      ...nextData[index],
    };
    nextData[index] = {
      id,
      name,
    }

    setData(nextData);

    try {
      await categoriesAPI.editCategory(categoryType, id, { name });
    } catch (error) {
      console.log(error);

      nextData = [...nextData];
      nextData[index] = prevItem;
      setData(nextData);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading, data, setData]);

  const deleteDataItem = React.useCallback(async (prevData: RowData) => {
    if (!isLoading) {
      setIsLoading(true);
    }

    const { id } = prevData;
    let nextData = [
      ...data,
    ];

    const index = nextData.findIndex((item: DataItem) => item.id === id);
    const prevItem = {
      ...nextData[index],
    };
    nextData.splice(index, 1);

    setData(nextData);

    try {
      await categoriesAPI.deleteCategory(categoryType, id);
    } catch (error) {
      console.log(error);

      nextData = [...nextData];
      nextData.splice(index, 0, prevItem);
      setData(nextData);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading, data, setData]);

  const rowAdd = React.useCallback(async (nextData: RowData): Promise<void> => {
    createDataItem(nextData);
    return Promise.resolve();
  }, [createDataItem]);

  const rowUpdate = React.useCallback(async (nextData: RowData, prevData?: RowData): Promise<void> => {
    editDataItem(nextData, prevData);
  }, [editDataItem]);

  const rowDelete = React.useCallback(async (prevData: RowData): Promise<void> => {
    deleteDataItem(prevData);
    return Promise.resolve();
  }, [deleteDataItem]);

  React.useEffect(() => {
    getData();
  }, []);

  return {
    isLoading,
    data,
    rowAdd,
    rowUpdate,
    rowDelete
  }
}