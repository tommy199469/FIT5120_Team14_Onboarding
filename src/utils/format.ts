export const padZerosBehind = (amount: any, dp: number) => {
  return String(amount * 10 ** dp);
};

export function getQueryParam(queryString?: string) {
  const urlSearchParams = new URLSearchParams(queryString);
  const queryObj = Object.fromEntries(urlSearchParams.entries());
  return queryObj;
}

export const formatDollar = (amount: any, withDollarSign?: false) => {
  amount = parseFloat(amount);
  const formatter = new Intl.NumberFormat(
    "en-US",
    withDollarSign
      ? {
          style: "currency",
          currency: "USD",
        }
      : {}
  );
  return formatter.format(amount);
};

export const getPaymentMethodName = (item: string) => {
  switch (item) {
    case "octopus":
      return "Octopus";
    case "payme":
      return "PayMe";
    case "fps":
      return "FPS";
    case "pinpayments":
      return "Pin Payments";
    case "unionpay":
      return "Union Pay";
    case "yunshanfu":
      return "雲閃付 Yun Shan Fu";
    case "visamaster":
      return "Visa / Master Card";
    case "alipay":
      return "Alipay";
    case "gc_pay":
      return "Global Cash Pay";
    default:
      return "Unknown";
  }
};
