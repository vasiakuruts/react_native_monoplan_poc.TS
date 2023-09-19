export type StatementRecord = {
  id?: string;
  time: number;
  description?: string;
  mcc?: number,
  amount: number,
  operationAmount?: number;
  currencyCode?: number;
  commissionRate?: number;
  cashbackAmount?: number;
  balance: number;
  hold?: boolean;
};

export type StatementState = {
  items: Array<StatementRecord>;
}
