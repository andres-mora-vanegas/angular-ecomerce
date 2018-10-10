import { VehicleDTO } from './vehicle-dto';
import { ClientModel } from './../client/client.model';
export class ClientVehicleDTO {

    public client: ClientModel;
    public vehicle: VehicleDTO;
}
