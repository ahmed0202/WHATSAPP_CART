import React from "react";

const CurrencyFormatter = ({ amount, currency }) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency, // specify the currency code here, e.g., 'USD', 'EUR', etc.
  }).format(amount);
  let currencyAmount = formattedAmount.slice(3);
  let currencyType = formattedAmount.slice(0, 3);
  return (
    <span>
      {currencyAmount} {currencyType}
    </span>
  );
};

export default CurrencyFormatter;
