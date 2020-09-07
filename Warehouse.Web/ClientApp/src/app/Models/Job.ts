import {List} from "./List";
import {Project} from "./Project";
import {User, UserId} from "./User";

export interface JobStatus
{
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

export interface JobPriority
{
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

export interface JobType
{
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

export interface JobEmployment
{
  jobId: string;
  userId: string;
}

export interface Job
{
  id?: string;
  title: string;
  link?: string;
  description: string;
  created?: Date;
  deadline: Date;
  finished?: Date;
  commit: string;

  jobStatus: JobStatus;
  jobPriority: JobPriority;
  jobType: JobType;

  list?: List;
  project?: Project;
  employments?: JobEmployment[];
}

export interface NewJob
{
  job: Job;
  employments: User[];
  listId: string;
  projectId: string;
}

export interface JobByStatus
{
  statusId: string;
  jobs: Job[];
}
