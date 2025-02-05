const product = [
  {
    productId: "1",
    productName: "Laptop",
    productPrice: 10000,
  },
  {
    productId: "2",
    productName: "Food",
    productPrice: 1000,
  },
  {
    productId: "3",
    productName: "Udemy",
    productPrice: 499,
  },
];

export class ProductService {
  static getProduct() {
    return product;
  }

  static getProductId(id: string) {
    return product.find((prod) => prod.productId === id);
  }
}
