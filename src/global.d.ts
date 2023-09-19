declare type ToastType =
  | 'SUCCESS'
  | 'INFO'
  | 'ERROR';

declare type AuthState =
  | 'UNDEFINED'
  | 'AUTH'
  | 'NOT-AUTH';

declare interface Category {
  id: string;
  name: string;
}

declare type CategoryType =
  | 'income'
  | 'expenses';

declare type BankType =
  | 'monobank'
  | 'privatbank';

declare interface Bank {
  id: string;
  type: BankType;
  APIKey: string;
}