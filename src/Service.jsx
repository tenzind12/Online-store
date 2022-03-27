// 1. ORDERS == F U N C T I O N S ======= //
export const OrderService = {
  // fetch previous orders (payment done)
  getPrevOrders: (orders) => {
    return orders.filter((order) => order.isPaymentCompleted === true);
  },

  // fetch cart (payment not done)
  getCart: (orders) => {
    return orders.filter((order) => order.isPaymentCompleted === false);
  },
};

// 2. PRODUCTS == F U N C T I O N S ======= //
export const ProductService = {
  // fetch products by ID
  getProductByProductId: (products, productId) => {
    return products.find((product) => product.id === productId);
  },

  //  fetch all products
  fetchProducts: () => {
    return fetch(`http://localhost:5000/products`, { method: 'GET' });
  },
};

// 3. BRANDS == F U N C T I O N S ======= //
export const BrandService = {
  // fetching all brands
  fetchBrands: () => {
    return fetch('http://localhost:5000/brands', { method: 'GET' });
  },

  // get brand by Id
  getBrandById: (brands, id) => {
    return brands.find((brand) => brand.id === id);
  },
};

// 4. CATEGORIES == F U N C T I O N S ======= //
export const CategoriesService = {
  // fetch categories
  fetchCategories: () => {
    return fetch('http://localhost:5000/categories', { method: 'GET' });
  },

  // get category by Id
  getCategoryById: (categories, id) => {
    return categories.find((category) => category.id === id);
  },
};
