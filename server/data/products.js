const IMAGE_CDN_URL = 'https://res.cloudinary.com/irfan-maulana-tkpd/image/upload';

const createProduct = (id, name, price, review, rating, imageUrl) => {
  return {
    id,
    name,
    image: `${IMAGE_CDN_URL}${imageUrl}`,
    price,
    review,
    rating,
  };
};

export default [
  createProduct('product-1', 'Prouduct 1', 'Rp. 123.000', 5, 5, '/v1595999139/product-1_iadqf4.jpg'),
  createProduct('product-2', 'Prouduct 2', 'Rp. 242.000', 5, 5, '/v1595999139/product-2_mtdzun.jpg'),
  createProduct('product-3', 'Prouduct 3', 'Rp. 976.000', 5, 5, '/v1595999139/product-3_onudly.jpg'),
  createProduct('product-4', 'Prouduct 4', 'Rp. 567.000', 5, 5, '/v1595999139/product-4_cvpqz5.jpg'),
  createProduct('product-5', 'Prouduct 5', 'Rp. 32.000', 5, 5, '/v1595856357/product-5_xcxn7d.jpg'),
  createProduct('product-6', 'Prouduct 6', 'Rp. 12.000', 5, 5, '/v1595856358/product-6_olcdsk.jpg'),
  createProduct('product-7', 'Prouduct 7', 'Rp. 1.000', 5, 5, '/v1595856463/product-7_lwfhun.jpg'),
  createProduct('product-8', 'Prouduct 8', 'Rp. 32.000', 5, 5, '/v1595856355/product-8_qd0u0t.jpg'),
  createProduct('product-9', 'Prouduct 9', 'Rp. 32.000', 5, 5, '/v1595856356/product-9_kcj58m.jpg'),
  createProduct('product-10', 'Prouduct 10', 'Rp. 4.000', 5, 5, '/v1595856357/product-10_pl8tka.jpg'),
  createProduct('product-11', 'Prouduct 11', 'Rp. 564.000', 5, 5, '/v1595856366/product-11_qwknkh.jpg'),
  createProduct('product-12', 'Prouduct 12', 'Rp. 5.000', 5, 5, '/v1595856364/product-12_mcpldu.jpg'),
  createProduct('product-13', 'Prouduct 12', 'Rp. 878.000', 5, 5, '/v1595856366/product-13_i3zqg3.jpg'),
  createProduct('product-14', 'Prouduct 14', 'Rp. 912.000', 5, 5, '/v1595856363/product-14_pr37lm.jpg'),
  createProduct('product-15', 'Prouduct 15', 'Rp. 156.000', 5, 5, '/v1595856361/product-15_ejitc4.jpg'),
  createProduct('product-16', 'Prouduct 16', 'Rp. 176.000', 5, 5, '/v1595856360/product-16_nqd073.jpg'),
];
