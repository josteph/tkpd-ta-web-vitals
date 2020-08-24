const { PUBLIC_PATH } = process.env;

const createProduct = (id, name, price, review, rating, imageIndex) => {
  return {
    id,
    name,
    image: `${PUBLIC_PATH}/images/product-${imageIndex}.jpg`,
    price,
    review,
    rating,
  };
};

export default [
  createProduct('product-1', 'Product 1', 'Rp. 123.000', 5, 5, 1),
  createProduct('product-2', 'Product 2', 'Rp. 242.000', 5, 5, 2),
  createProduct('product-3', 'Product 3', 'Rp. 976.000', 5, 5, 3),
  createProduct('product-4', 'Product 4', 'Rp. 567.000', 5, 5, 4),
  createProduct('product-5', 'Product 5', 'Rp. 32.000', 5, 5, 5),
  createProduct('product-6', 'Product 6', 'Rp. 12.000', 5, 5, 6),
  createProduct('product-7', 'Product 7', 'Rp. 1.000', 5, 5, 7),
  createProduct('product-8', 'Product 8', 'Rp. 32.000', 5, 5, 8),
  createProduct('product-9', 'Product 9', 'Rp. 32.000', 5, 5, 9),
  createProduct('product-10', 'Product 10', 'Rp. 4.000', 5, 5, 10),
  createProduct('product-11', 'Product 11', 'Rp. 564.000', 5, 5, 11),
  createProduct('product-12', 'Product 12', 'Rp. 5.000', 5, 5, 12),
  createProduct('product-13', 'Product 12', 'Rp. 878.000', 5, 5, 13),
  createProduct('product-14', 'Product 14', 'Rp. 912.000', 5, 5, 14),
  createProduct('product-15', 'Product 15', 'Rp. 156.000', 5, 5, 15),
  createProduct('product-16', 'Product 16', 'Rp. 176.000', 5, 5, 16),
];
