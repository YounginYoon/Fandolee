export const moneyFormat = (money) => {
  const ret = money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return ret;
};
