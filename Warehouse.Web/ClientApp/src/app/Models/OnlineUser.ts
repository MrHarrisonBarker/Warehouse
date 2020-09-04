export interface OnlineUser
{
  id: string;
  connectionId: string;
}

export interface TenantOnlineUserTracker
{
  id: string;
  onlineUsers: OnlineUser[];
}
