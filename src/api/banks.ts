import { client } from './client';

interface CreateBankOpts {
  type: BankType;
  APIKey: string;
}

interface EditBankOpts {
  type: BankType;
  APIKey: string;
}

export const getBanks = async () => {
  return client.get<Bank[]>('/banks');
}

export const createBank = async (body: CreateBankOpts) => {
  return client.post<Bank>('/banks', body);
}

export const editBank = async (id: string, body: EditBankOpts) => {
  return client.patch<Bank>(`/banks/${id}`, body);
}

export const deleteBank = async (id: string) => {
  return client.delete<Bank>(`/banks/${id}`);
}

export const banksAPI = {
  getBanks,
  createBank,
  editBank,
  deleteBank,
}
