import {User, UserId} from "./User";
import {Project} from "./Project";

export interface Chat
{
  id?: string;
  message: string;
  timeStamp?: Date;
  userId: string;
  room: Room;
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
