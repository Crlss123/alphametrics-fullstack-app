declare module "my-types" {
  export interface Person {
    id: number;
    first_name: string;
    second_name?: string;
    first_lastname: string;
    second_lastname: string;
    curp: string;
    gender: string;
    status: boolean;
  }
  export interface Zone {
    id: number;
    name: string;
    state: string;
  }

  export interface Population {
    id: number;
    age: number;
    zone: Zone;
  }
}
