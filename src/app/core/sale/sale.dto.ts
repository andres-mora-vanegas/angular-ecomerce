import { ProductModel } from "../product/product.model";

export class SaleDto {

    public product: ProductModel;
    public quantity: number;
    public category: number;
}
