import { IUser } from "./iuser";

export interface IApiResponse {
    isSuccess: boolean;
    message: string;
    entity: IUser[];

}
