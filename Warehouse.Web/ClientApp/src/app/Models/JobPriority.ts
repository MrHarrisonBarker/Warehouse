import {User} from "./User";

export interface JobPriority {
    id: string;
    name: string;
    colour: string;
    order: number;
    user: User | null;
}

export interface NewPriority
{
  name: string;
  order: number;
  colour: string;
}
