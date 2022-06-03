const { ApolloServer } = require("apollo-server");
const PORT = 8000;
const { typeDefs } = require("./schema");
const { db } = require("./data");
// const { Query } = require("./resolvers/Category");
// const { product } = require("./resolvers/Product");
// const { Category } = require("./resolvers/Category");
// const { Mutation } = require("./resolvers/Mutation");
const { v4: uuid } = require("uuid");
const resolvers = {
  Query: {
    hello: (parent, args, context) => {
      return null;
    },

    products: (parent, { filter }, { db }) => {
      let filteredProducts = db.products;

      if (filter) {
        const { avgRating, onSale } = filter;
        if (onSale) {
          filteredProducts = filteredProducts.filter((item) => {
            return item.onSale;
          });
        } else {
          filteredProducts = filteredProducts.filter((item) => {
            return !item.onSale;
          });
        }
        if ([1, 2, 3, 4, 5].includes(avgRating)) {
          filteredProducts = filteredProducts.filter((item) => {
            let sumRating = 0;
            let numberOfReviews = 0;
            reviews.forEach((rewview) => {
              if (rewview.productId == item.id) {
                sumRating += rewview.rate;
                numberOfReviews++;
              }
            });
            const avgRatingProduct = sumRating / numberOfReviews;
            console.log(avgRatingProduct, item.title);
            return avgRatingProduct >= avgRating;
          });
        }
      }
      return filteredProducts;
    },

    product: (parent, args, { db }) => {
      const productId = args.id;
      const usedata = db.products.find((product) => product.id == productId);
      return usedata;
    },

    categories: (parent, args, { db }) => {
      return db.categories;
    },

    category: (parent, args, { db }) => {
      const { id } = args;
      const cate = db.categories.find((item) => item.id == id);
      return cate;
    },
  },
  // One To Many and filter
  Category: {
    products: (parent, { filter }, { db }) => {
      const categoryid = parent.id;
      const categoryProducts = db.products.filter(
        (item) => item.categoryId == categoryid
      );
      let filteredCategoryProducts = categoryProducts;
      if (filter) {
        if (filter.onSale == true) {
          filteredCategoryProducts = filteredCategoryProducts.filter((item) => {
            return item.onSale;
          });
        } else {
          filteredCategoryProducts = filteredCategoryProducts.filter((item) => {
            return !item.onSale;
          });
        }
      }
      return filteredCategoryProducts;
    },
  },
  // Many To One
  product: {
    catetgory: ({ categoryId }, args, { db }) => {
      // const categoryId = parent.categoryId;
      return db.categories.find((item) => item.id == categoryId);
    },
    reviews: ({ id }, args, { db }) => {
      return db.reviews.filter((item) => item.productId == id);
    },
  },
  // add data
  Mutation: {
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    db,
  },
});

server.listen(PORT, () => {
  console.log("server is running on", PORT);
});
