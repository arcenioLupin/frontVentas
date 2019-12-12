export default function(money) {
  const moneyWithDecimals = parseFloat(money).toFixed(2);
  if (moneyWithDecimals === "NaN") return "";
  const moneyWithCommas = moneyWithDecimals.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  return moneyWithCommas;
}
