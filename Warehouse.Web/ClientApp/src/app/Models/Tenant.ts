import {User} from "./User";
import {JobStatus} from "./JobStatus";
import {JobPriority} from "./JobPriority";
import {JobType} from "./JobType";

export interface  Tenant
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

export interface TenantViewModel {
  id?: string;
  name: string;
  avatar: string;
  description: string;
  accent: string;

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
