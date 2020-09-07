import {User} from "./User";
import {Project} from "./Project";
import {Chat} from "./Chat";

export enum MessageType
{
  Message,
  JobMention,
  UserMention
}

export interface UserChat
{
  userId: string;
  chats: Chat[];
}

export interface Room
{
  id?: string;
  name: string;

  memberships?: roomMembership[];
  chats?: Chat[];
  project?: Project;
}

export interface roomMembership
{
  roomId: string;
  userId: string;
}

export interface NewRoom
{
  room: Room;
  projectId: string;
  memberships: User[];
}

export interface AddRoomUser
{
  roomId: string;
  userId: string;
}
