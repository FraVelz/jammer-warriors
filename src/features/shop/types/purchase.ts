export type PurchaseKind = "product" | "diy";

export type PaymentMethod = "paypal" | "stripe";

export type PurchaseItem = {
  kind: PurchaseKind;
  skuId: string;
  name: string;
  price: number;
  total: number;
  includesDelivery: boolean;
};
