export class CreateOrderDto {
    readonly customerId: number;
    readonly products: { productId: number }[];
  }
  