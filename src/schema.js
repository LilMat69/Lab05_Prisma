import { buildSchema} from 'graphql';

export const schema = buildSchema(`
    scalar DateTime

    type Product {
      id: Int!
      name: String!
      price: Int!
      createAt: String!
      category: Category!
      categoryID: Int!
      stock: Int!
    }

    type Category {
      id: Int!
      name: String!
      products: [Product]
    }

    type Query {
      products(price: Int, categoryID: Int): [Product!]!
      categories: [Category!]!
      product(id: Int!): Product!
      category(id: Int!): Category!
    }

    type Mutation {
      createProduct(name: String!, price: Int!, categoryID: Int!, stock: Int!): Product!
      createCategory(name: String!): Category!
      deleteProduct(id: Int!): Product!
      deleteCategory(id: Int!): Category!
      updateProduct(id: Int!, name: String, price: Int, stock: Int): Product!
    }
`);
