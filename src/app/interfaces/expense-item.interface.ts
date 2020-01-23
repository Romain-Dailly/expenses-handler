export interface ExpenseItemInterface {
  id: string;
  purchasedOn: Date;
  nature: string;
  originalAmount: number;
  convertedAmount: number;
  comment: string;
  createdAt: string;
  lastModifiedAt: string;
}