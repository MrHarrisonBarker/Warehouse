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
  short: string;
  name: string;
  description: string;
  created?: Date;
  accent: string;
  avatar: string;
  repo: string;

  rooms?: any[] | Room[];
  events?: any[] | Event[];
  lists?: List[];
  jobs?: Job[];
  employments?: projectEmployment[];
  // employments?: projectEmployment[] | UserId[];
}

export interface ProjectViewModel
{
  id?: string;
  short: string;
  name: string;
  description: string;
  created?: Date;
  accent: string;
  avatar: string;
  repo: string;

  rooms?: any[] | Room[];
  events?: any[] | Event[];

  lists: string[];
  employments: string[];
  jobs: string[];
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

export interface RemoveProjectUser
{
  projectId: string;
  userId: string;
}
