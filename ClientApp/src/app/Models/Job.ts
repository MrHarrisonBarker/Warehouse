import {List} from "./List";
import {Project} from "./Project";
import {User, UserId} from "./User";

export interface JobStatus
{
  id: string;
  name: string;
  colour: string;
  user: User | null;
}

export interface NewStatus
{
  name: string;
  colour: string;
}

export interface JobPriority
{
  id: string;
  name: string;
  colour: string;
  user: User | null;
}

export interface NewPriority
{
  name: string;
  colour: string;
}

export interface JobType
{
  id: string;
  name: string;
  colour: string;
  user: User | null;
}

export interface NewType
{
  name: string;
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
  description: string;
  created?: Date;
  deadline: Date;

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
