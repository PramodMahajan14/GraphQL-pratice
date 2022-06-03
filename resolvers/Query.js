exports.Query = {
  hello: (parent, args, context) => {
    return "hlll";
  },

  products: (parent, args, { products }) => {
    console.log(products);
    return products;
  },

  product: (parent, { id: productId }, { products }) => {
    // const productId = args.id;
    const usedata = products.find((product) => product.id == productId);
    return usedata;
  },

  categories: (parent, args, { categories }) => {
    return categories;
  },
  category: (parent, { id }, { categories }) => {
    // const { id } = args;
    const cate = categories.find((item) => item.id == id);
    return cate;
  },
};

// creating new array using existing array
// let arr = [];
// products.forEach((item) => {
//   let obj = { id: item.id, name: item.category };
//   arr.push(obj);
// });
// console.log(arr);
