export interface PaymentMethod {
  id: number;
  dbMaxDepositAmount: number;
  dbMaxWithdrawalAmount: number;
  dbMinDepositAmount: number;
  dbMinWithdrawalAmount: number;
  dtDateCreated: string; // ISO 8601 date string
  dtDateUpdated: string; // ISO 8601 date string
  strImageUrl: string | null;
  strDriverClassName: string;
  strPaymentCode: string;
  supportedMethods: SupportedMethod[];
  strProviderName: string;
  bactive: boolean;
  bcashin: boolean;
  bcashout: boolean;
}

export type SupportedMethod = "MOBILE_WALLET" | "BANK_TRANSFER" | "CREDIT_CARD" | "PAYPAL" | "CRYPTO";

export interface RechargeRequest {
  userId: string;
  reference: string;
  paymentMethod: string;
  paymentCode: string;
  extra: string;
  amount: number;
}
