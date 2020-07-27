import productsData from './products';

export default (id) => {
	const foundProduct = productsData.find(i => i.id === id);

	if (foundProduct) {
		return {
			success: true,
			data: foundProduct,
		}
	}

	return {
    success: false,
    data: null,
  };
}
