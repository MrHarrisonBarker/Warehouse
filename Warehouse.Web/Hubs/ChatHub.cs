using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Warehouse.Models;
using Warehouse.Services;

namespace Warehouse.Hubs
{
    public class ChatHub : Hub
    {
        private readonly TenantService _tenantService;
        
        public ChatHub(TenantService tenantService)
        {
            _tenantService = tenantService;
        }
        
        public async Task SendChat(Chat chat)
        {
            Console.WriteLine($"New chat {chat.Message}");
            
            var tenant = (await _tenantService.GetTenantFromHostAsync());
            
            if (tenant != null)
            {
                Console.WriteLine($"tenant {tenant.Name} : {tenant.Id}");
                using (var context = _tenantService.CreateContext(tenant))
                {
                    var chatService = new ChatService(context);
                    chat.TimeStamp = DateTime.Now;
                    var newChat = await chatService.CreateChat(chat);
                    var newnewChat = new Chat()
                    {
                        Id = Guid.NewGuid(),
                        Message = "Hello world"
                    };

                    if (newChat != null)
                    {
                        Console.WriteLine($"new Chat {newChat.Message} : {newChat.TimeStamp}");
                        newChat.Room.Chats = null;
                        newChat.Room.Memberships = null;
                        newChat.Room.Project = null;
                        
                        await Clients.All.SendAsync("NewChatMessage", newChat);
                    }
                }
            }
        }
        
        
        public override async Task OnConnectedAsync()
        {
            Console.WriteLine($"Client Connected {Context.ConnectionId}");
        }
        
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            Console.WriteLine($"Client Disconnceted {Context.ConnectionId}");
            await Clients.All.SendAsync("disconnect");
            // await Clients.All.SendAsync("disconnect",_onlineUsers.RemoveConnection(Context.ConnectionId));
        }
    }
}