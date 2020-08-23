import {Project} from "./Project";

export interface Event
{
  id: string;
  name: string;
  time: Date;
  description: string;
  Project: Project;
}
