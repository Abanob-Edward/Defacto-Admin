export interface ApiIsize {

    entities:{
       id: number;
       name: string;
       code: string | null;
       notActive: boolean | null;
    }[];
    count: number;
   }

