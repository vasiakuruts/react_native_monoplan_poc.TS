import { client } from './client';

interface CreateCategoryOpts {
  name: string;
}

interface EditCategoryOpts {
  name: string;
}

export const getCategories = async (categoryType: CategoryType) => {
  return client.get<Category[]>(`/categories/${categoryType}`);
}

export const createCategory = async (categoryType: CategoryType, body: CreateCategoryOpts) => {
  return client.post<Category>(`/categories/${categoryType}`, body);
}

export const editCategory = async (categoryType: CategoryType, categoryId: string, body: EditCategoryOpts) => {
  return client.patch<Category>(`/categories/${categoryType}/${categoryId}`, body);
}

export const deleteCategory = async (categoryType: CategoryType, categoryId: string) => {
  return client.delete<Category>(`/categories/${categoryType}/${categoryId}`);
}

export const categoriesAPI = {
  getCategories,
  createCategory,
  editCategory,
  deleteCategory,
}
