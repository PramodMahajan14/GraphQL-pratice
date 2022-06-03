const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    hello: String
    products(filter: ProductsFilterInput): [product!]
    product(id: ID!): product
    categories: [Category!]!
    category(id: ID!): Category!
  }
  type Mutation {
    addCategory(input: addCategoryInput!): Category!
    addProduct(input: addProductInput!): product!
    addReview(input: addReviewInput!): Review!
    deleteCategory(id: ID!): String!
    deleteProduct(id: ID!): String!
    deleteReview(id: ID!): String!
    updateCategory(id: ID!, input: updateCategoryInput!): Category
    updateProduct(id: ID!, input: UpdateProductInput!): product
    updateReview(id: ID!, input: UpdateReviewInput!): Review
  }

  type product {
    id: ID!
    title: String!
    price: Float!
    description: String!
    category: String!
    image: String!
    onSale: Boolean!
    catetgory: Category
    reviews: [Review!]!
  }
  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [product!]!
  }
  type Review {
    id: ID!
    rate: Float!
    count: Int!
    productId: ID!
  }

  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Float
  }
  input addCategoryInput {
    name: String!
  }
  input updateCategoryInput {
    name: String!
  }
  input addProductInput {
    title: String!
    price: Float!
    description: String!
    image: String!
    onSale: Boolean!
    CategoryId: String!
  }
  input UpdateProductInput {
    title: String!
    price: Float!
    description: String!
    image: String!
    onSale: Boolean!
    CategoryId: String!
  }
  input addReviewInput {
    rate: Float!
    count: Int!
    productId: ID!
  }
  input UpdateReviewInput {
    rate: Float!
    count: Int!
    productId: ID!
  }
`;
