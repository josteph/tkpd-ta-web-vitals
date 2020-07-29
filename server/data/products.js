const { API_URL } = process.env;
const IMAGE_URL = API_URL.replace('/api', '/images');

const createProduct = (id, name, price, review, rating, imageIndex) => {
  return {
    id,
    name,
    image: `${IMAGE_URL}/product-${imageIndex}.jpg`,
    price,
    review,
    rating,
  };
};

export default [
  createProduct('product-1', 'Prouduct 1', 'Rp. 123.000', 5, 5, 1),
  createProduct('product-2', 'Prouduct 2', 'Rp. 242.000', 5, 5, 2),
  createProduct('product-3', 'Prouduct 3', 'Rp. 976.000', 5, 5, 3),
  createProduct('product-4', 'Prouduct 4', 'Rp. 567.000', 5, 5, 4),
  createProduct('product-5', 'Prouduct 5', 'Rp. 32.000', 5, 5, 5),
  createProduct('product-6', 'Prouduct 6', 'Rp. 12.000', 5, 5, 6),
  createProduct('product-7', 'Prouduct 7', 'Rp. 1.000', 5, 5, 7),
  createProduct('product-8', 'Prouduct 8', 'Rp. 32.000', 5, 5, 8),
  createProduct('product-9', 'Prouduct 9', 'Rp. 32.000', 5, 5, 9),
  createProduct('product-10', 'Prouduct 10', 'Rp. 4.000', 5, 5, 10),
  createProduct('product-11', 'Prouduct 11', 'Rp. 564.000', 5, 5, 11),
  createProduct('product-12', 'Prouduct 12', 'Rp. 5.000', 5, 5, 12),
  createProduct('product-13', 'Prouduct 12', 'Rp. 878.000', 5, 5, 13),
  createProduct('product-14', 'Prouduct 14', 'Rp. 912.000', 5, 5, 14),
  createProduct('product-15', 'Prouduct 15', 'Rp. 156.000', 5, 5, 15),
  createProduct('product-16', 'Prouduct 16', 'Rp. 176.000', 5, 5, 16),
];
