const sendCartToWhatsapp = ({ order, cart_link }) => {
  const sellerPhonenumber = "+9647507250752";
  const customerPhonenumber = `*phone number:* ${order.order_phonenumber}%0a`;
  const city = `*city:* ${order.order_city}%0a`;
  const totalItems = `*total Items:* ${order.order_total_qty}%0a`;
  const totalAmount = `*total amount:* ${order.order_subtotal} IQD%0a`;
  const cartLink = `*cart link:* ${cart_link.replace("cart", "orders/edit")}/${
    order.order_id
  }%0a%0a`;

  const waUrl = `https://wa.me/${sellerPhonenumber}/?text=${customerPhonenumber}${city}${totalItems}${totalAmount}${cartLink}`;

  window.open(waUrl, "_blank").focus();
};

export default sendCartToWhatsapp;
