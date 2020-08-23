import {Project} from "./Project";
import {Job} from "./Job";
import {User, UserId} from "./User";

export interface List
{
  id?:string;
  name:string;
  deadline?:Date;
  created?: Date;
  description: string;

  project?: Project;
  jobs?: Job[];
  employments?: UserId[];
}

export interface CreateList
{
  list: List;
  projectId: string;
  employments: User[];
}