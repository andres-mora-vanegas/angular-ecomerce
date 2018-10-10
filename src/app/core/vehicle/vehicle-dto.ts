import { CityModel } from './../city/city.model';
import { BrandModel } from "../brand/brand.model";
import { KindModel } from "../kind/kind.model";

export class VehicleDTO {

    public id: number;
    public enrollment: string;
    public city: CityModel;
    public brand: BrandModel;
    public kind: KindModel;
    public created: string;
    public modified: string;
    public state: number;

}
