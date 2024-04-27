export interface ApiColor {
    entities: {
       id: number;
       name: string;
       hex: string | null;
       rgb: string | null;
       notActive: boolean | null;
    }[];
    count: number;
   }


