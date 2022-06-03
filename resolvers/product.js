module.exports.product = {
  catetgory: ({ categoryId }, args, { categories }) => {
    // const categoryId = parent.categoryId;
    return categories.find((item) => item.id == categoryId);
  },
};
