import {List} from "./List";
import {Project} from "./Project";
import {User} from "./User";
import {JobStatus} from "./JobStatus";
import {JobPriority} from "./JobPriority";
import {JobType} from "./JobType";
import {Module} from "./Module";

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
  deadline: Date | string;
  finished?: Date | string;
  commit: string;

  jobStatus: JobStatus;
  jobPriority: JobPriority;
  jobType: JobType;

  list?: List;
  project?: Project;
  employments?: JobEmployment[];
  module?: Module;
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

export interface AddJobUser
{
  userId: string;
  jobId: string;
}
