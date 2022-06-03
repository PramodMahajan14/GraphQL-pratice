exports.Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const { name } = input;
    let newCategory = {
      id: uuid(),
      name,
    };
    db.categories.push(newCategory);
    return newCategory;
  },
  addProduct: (parent, { input }, { db }) => {
    const { title, price, description, onSale, categoryId, image } = input;
    let newproduct = {
      id: uuid(),
      title,
      price,
      description,
      onSale,
      categoryId,
      image,
    };
    db.products.push(newproduct);
    return newproduct;
  },
  addReview: (parent, { input }, { db }) => {
    const { rate, count } = input;
    let newReview = {
      id: uuid(),
      rate,
      count,
    };
    db.reviews.push(newReview);
    return newReview;
  },
  deleteCategory: (parent, { id }, { db }) => {
    db.categories = db.categories.filter((cate) => cate.id !== id);
    db.products = db.products.map((prod) => {
      if (prod.categoryId == id)
        return {
          ...prod,
          categoryId: null,
        };
      else return prod;
    });
    return "Deleted data";
  },
  deleteProduct: (parent, { id }, { db }) => {
    db.products = db.products.filter((prod) => prod.id !== id);
    db.reviews = db.reviews.filter((review) => review.productId !== id);
    return "product is deleted successfully !";
  },
  deleteReview: (parent, { id }, { db }) => {
    db.reviews = db.reviews.filter((revi) => revi.id !== id);
    return "Review is deleted!";
  },
  updateCategory: (parent, { id, input }, { db }) => {
    const index = db.categories.findIndex((cate) => cate.id == id);
    if (index == -1) return null;
    db.categories[index] = {
      ...db.categories[index],
      ...input,
    };
    return db.categories[index];
  },
  updateProduct: (parent, { id, input }, { db }) => {
    const index = db.products.findIndex((prod) => prod.id == id);
    if (index == -1) return null;
    db.products[index] = {
      ...db.products[index],
      ...input,
    };
    return db.products[index];
  },
  updateReview: (parent, { id, input }, { db }) => {
    const index = db.reviews.findIndex((rev) => rev.id == id);
    if (index == -1) return null;
    db.reviews[index] = {
      ...db.reviews[index],
      ...input,
    };
    return db.reviews[index];
  },
};
