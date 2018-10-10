export class CityModel {

    public  id: number;
    public name: string;
    public country: {
        id: number,
        name: string
    };
    public created: string;
}
