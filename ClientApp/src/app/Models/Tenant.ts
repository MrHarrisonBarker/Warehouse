import {JobPriority, JobStatus, JobType} from "./Job";
import {User} from "./User";

export interface Tenant
{
  id?: string;
  name: string;
  avatar: string;
  description: string;
  accent: string;

  employments?: User[];

  jobStatuses?: JobStatus[];
  jobPriorities?: JobPriority[];
  jobTypes?: JobType[];
}

export class Authenticate
{
  email: string;
  password: string;
}

export interface CreateTenant
{
  tenant: Tenant;
  userId: string;
}
