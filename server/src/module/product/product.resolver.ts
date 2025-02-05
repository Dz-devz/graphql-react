import { ProductController } from "./product.controller";
import type { ArgsProductId } from "./product.model";

export const resolversProduct = {
  Query: {
    getProduct: async () => {
      return ProductController.getAllProduct();
    },
    getProductId: async (_parent: unknown, args: ArgsProductId) => {
      const { productId } = args;
      return ProductController.getProductId(productId);
    },
  },
};
