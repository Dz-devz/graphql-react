export const productTypeDefs = `
  type Query {
    getProduct: [Product]
    getProductId(id: ID!): Product
  }
  
  type Product {
    productId: ID
    productName: String
    productPrice: Int
  }
`;
