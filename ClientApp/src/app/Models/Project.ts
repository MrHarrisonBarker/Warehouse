import {User, UserId} from "./User";
import {Job} from "./Job";
import {List} from "./List";
import {Event} from "./Event";
import {Room} from "./Room";

export interface projectEmployment
{
  projectId:string;
  project?: any;
  userId:string;
  user?: User;
}

export interface Project
{
  id?: string;
  name: string;
  description: string;
  created?: Date;
  accent: string;
  avatar: string;
  repo: string;

  rooms?: any[] | Room[];
  events?: any[] | Event[];
  lists?: any[] | List[];
  jobs?: any[] | Job[];
  employments?: projectEmployment[];
  // employments?: projectEmployment[] | UserId[];
}

export interface NewProject
{
  project: Project;
  employments: User[];
}

export interface AddProjectUser
{
  projectId: string;
  userId: string;
}
