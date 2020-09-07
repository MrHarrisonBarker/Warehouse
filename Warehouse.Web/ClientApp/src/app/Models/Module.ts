import {Job} from "./Job";

export interface Module
{
  id?: string,
  name: string,
  jobs: Job[]
}

export interface ModuleViewModel
{
  id?: string,
  name: string,
  jobCount: number
}
