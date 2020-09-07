import {User} from "./User";

export interface JobStatus {
    id: string;
    name: string;
    colour: string;
    finished: boolean;
    order: number;
    user: User | null;
}

export interface NewStatus
{
  name: string;
  order: number;
  colour: string;
  finished: boolean;
}
