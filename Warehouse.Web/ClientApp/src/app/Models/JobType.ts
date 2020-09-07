import {User} from "./User";

export interface JobType {
    id: string;
    name: string;
    colour: string;
    order: number;
    user: User | null;
}

export interface NewType
{
  name: string;
  order: number;
  colour: string;
}
