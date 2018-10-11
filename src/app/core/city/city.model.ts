export class CityModel {

    public id: number;
    public name: string;
    public country: {
        id: number,
        name: string,
        created: string,
        modified: string
    };
    public created: string;
    public modified: string;
    public state: string;
}
