exports.Category = {
  products: ({ id: categoryid }, args, { products }) => {
    // const categoryid = parent.id;

    return products.filter((item) => item.categoryId == categoryid);
  },
};
