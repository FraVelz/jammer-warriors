export type PurchaseKind = "product" | "diy";

export type PurchaseItem = {
  kind: PurchaseKind;
  name: string;
  price: number;
  total: number;
  includesDelivery: boolean;
};
