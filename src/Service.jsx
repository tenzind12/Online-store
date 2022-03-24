// ======= O R D E R S == F U N C T I O N S ======= //

export const OrderService = {
  // G E T  P A I D  O R D E R S
  getPrevOrders: (orders) => {
    return orders.filter((order) => order.isPaymentCompleted === true);
  },

  // G E T  C A R T (payment not done)
  getCart: (orders) => {
    return orders.filter((order) => order.isPaymentCompleted === false);
  },
};

// ======= P R O D U C T S == F U N C T I O N S ======= //
export const ProductService = {
  // G E T   P R O D U C T   by their ID
  getProductByProductId: (products, productId) => {
    return products.find((product) => product.id === productId);
  },

  //  F E T C H   P R O D U C T S
  fetchProducts: () => {
    return fetch(`http://localhost:5000/products`, { method: 'GET' });
  },
};
