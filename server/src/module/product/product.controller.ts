import { ProductService } from "./product.service";

export class ProductController {
  static getAllProduct() {
    return ProductService.getAllProduct();
  }

  static getProductId(id: string) {
    return ProductService.getProductId(id);
  }
}
