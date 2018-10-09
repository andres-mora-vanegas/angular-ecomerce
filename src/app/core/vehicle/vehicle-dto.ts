import { BrandModel } from "../brand/brand.model";
import { KindModel } from "../kind/kind.model";

export class VehicleDTO {

    public id: number;
    public enrollment: string;
    public city: {
        id: number,
        name: string,
        country: {
            id: number,
            name: string
        }
        created: string
    };
    public brand: BrandModel;
    public kind: KindModel;
    public created: string;
    public modified: string;
    public state: number;

}
