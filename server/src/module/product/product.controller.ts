import { ProductService } from "./product.service";

export class ProductController {
  static async getProduct() {
    return ProductService.getProduct();
  }

  static async getProductId(id: string) {
    return ProductService.getProductId(id);
  }
}
