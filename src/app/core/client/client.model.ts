import { StateModel } from "../state/state.model";

export class ClientModel {
    public id: number;
    public email: string;
    public first_name: string;
    public last_name: string;
    public identification: string;
    public scanned_identification: string;
    public created: string;
    public modified: string;
    public state: StateModel;

}
