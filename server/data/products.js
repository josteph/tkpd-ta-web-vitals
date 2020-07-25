const makeId = length => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const createProduct = (name, price, review, rating, imageIndex) => {
  return {
    id: makeId(8),
    name,
    image: `https://github.com/irfan-maulana-tkp/tkpd-ta-web-vitals/raw/master/public/images/product-${imageIndex}.jpg`,
    price,
    review,
    rating,
  };
};

export default [
  createProduct('Prouduct 1', 'Rp. 123.000', 5, 5, 1),
  createProduct('Prouduct 2', 'Rp. 242.000', 5, 5, 2),
  createProduct('Prouduct 3', 'Rp. 976.000', 5, 5, 3),
  createProduct('Prouduct 4', 'Rp. 567.000', 5, 5, 4),
  createProduct('Prouduct 5', 'Rp. 32.000', 5, 5, 1),
  createProduct('Prouduct 6', 'Rp. 12.000', 5, 5, 2),
  createProduct('Prouduct 7', 'Rp. 1.000', 5, 5, 3),
  createProduct('Prouduct 8', 'Rp. 32.000', 5, 5, 4),
  createProduct('Prouduct 9', 'Rp. 32.000', 5, 5, 1),
  createProduct('Prouduct 10', 'Rp. 4.000', 5, 5, 2),
  createProduct('Prouduct 11', 'Rp. 564.000', 5, 5, 3),
  createProduct('Prouduct 12', 'Rp. 5.000', 5, 5, 4),
  createProduct('Prouduct 12', 'Rp. 878.000', 5, 5, 1),
  createProduct('Prouduct 14', 'Rp. 912.000', 5, 5, 2),
  createProduct('Prouduct 15', 'Rp. 156.000', 5, 5, 3),
  createProduct('Prouduct 16', 'Rp. 176.000', 5, 5, 4),
];
