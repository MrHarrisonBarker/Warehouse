using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Warehouse.Contexts;
using Warehouse.Models;

namespace Warehouse.Services
{
    public interface IChatService
    {
        Task<Chat> CreateChat(Chat chat);
    }

    public class ChatService : IChatService
    {
        private readonly TenantDataContext _tenantDataContext;

        public ChatService(TenantDataContext tenantDataContext)
        {
            _tenantDataContext = tenantDataContext;
        }

        public async Task<Chat> CreateChat(Chat chat)
        {
            var room = await _tenantDataContext.Rooms.FirstOrDefaultAsync(x => x.Id == chat.Room.Id);
            // var userId = await _tenantDataContext.UserIds.FirstOrDefaultAsync(x => x.Id == chat.Id);

            // if (room == null || userId == null)
            if (room == null)
            {
                return null;
            }

            chat.Room = room;
            // chat.UserId = userId;
            await _tenantDataContext.Chats.AddAsync(chat);

            if (room.Chats == null)
            {
                room.Chats = new List<Chat>();
            }
            room.Chats.Add(chat);
            
            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return chat;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Exception when creating chat {e}");
                return null;
            }
        }
    }
}