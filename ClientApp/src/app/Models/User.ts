import {Tenant} from "./Tenant";

export interface User
{
  id?: string;
  displayName: string;
  avatar: string;
  email: string;
  password: string;
  token?: string;

  permissions?: any[];
  employments?: any[] | Tenant[];
}

export interface UserId
{

  id: string;

}
