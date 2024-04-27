import { IUserChart } from "./iuser-chart";


export interface ChartResponce {
  isSuccess: boolean;
  message: string;
  entity: IUserChart[];
}
