using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Warehouse.Contexts;
using Warehouse.Controllers;
using Warehouse.Models;
using Warehouse.Models.Joins;

namespace Warehouse.Services
{
    public interface IRoomService
    {
        Task<IList<Room>> GetAllRoomsAsync(Guid userId);
        Task<Room> GetRoomAsync(Guid id);
        Task<bool> CreateRoomAsync(NewRoom newRoom);
        Task<bool> DeleteRoomAsync(Room room);
        Task<bool> AddUserAsync(Guid roomId, Guid userId);
        Task<bool> RemoveUserAsync(Guid roomId, Guid userId);
    }

    public class RoomService : IRoomService
    {
        private readonly TenantDataContext _tenantDataContext;

        public RoomService(TenantDataContext tenantDataContext)
        {
            _tenantDataContext = tenantDataContext;
        }

        public async Task<IList<Room>> GetAllRoomsAsync(Guid userId)
        {
            return await _tenantDataContext.Rooms
                .Where(x => x.Memberships.FirstOrDefault(membership => membership.UserId == userId) != null)
                .ToListAsync();
        }

        public async Task<Room> GetRoomAsync(Guid id)
        {
            return await _tenantDataContext.Rooms.Include(x => x.Chats).Include(x => x.Memberships)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> CreateRoomAsync(NewRoom newRoom)
        {
            var project = await _tenantDataContext.Projects.FirstOrDefaultAsync(x => x.Id == newRoom.ProjectId);

            if (project == null)
            {
                Console.WriteLine("Couldn't find project");
                return false;
            }

            newRoom.Room.Project = project;

            await _tenantDataContext.Rooms.AddAsync(newRoom.Room);

            newRoom.Room.Chats = new List<Chat>();
            newRoom.Room.Memberships = new List<RoomMembership>();
            foreach (var roomMembership in newRoom.Memberships)
            {
                newRoom.Room.Memberships.Add(new RoomMembership()
                {
                    RoomId = newRoom.Room.Id, UserId = roomMembership.Id
                });
            }


            if (project.Rooms == null)
            {
                project.Rooms = new List<Room>();
            }

            project.Rooms.Add(newRoom.Room);

            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Exception when creating room {e}");
                return false;
            }
        }

        public Task<bool> DeleteRoomAsync(Room room)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> AddUserAsync(Guid roomId, Guid userId)
        {
            var user = await _tenantDataContext.UserIds.FirstOrDefaultAsync(x => x.Id == userId);
            var room = await _tenantDataContext.Rooms.FirstOrDefaultAsync(x => x.Id == roomId);

            if (user == null || room == null)
            {
                Console.WriteLine("Couldn't find user or room");
                return false;
            }

            if (user.RoomMemberships == null)
            {
                user.RoomMemberships = new List<RoomMembership>();
            }

            user.RoomMemberships.Add(new RoomMembership() {RoomId = room.Id, UserId = user.Id});

            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public async Task<bool> RemoveUserAsync(Guid roomId, Guid userId)
        {
            var employment = await _tenantDataContext.RoomMembership.FirstOrDefaultAsync(x =>
                x.UserId == userId && x.RoomId == roomId);

            if (employment == null)
            {
                Console.WriteLine("Couldn't find employment");
                return false;
            }

            _tenantDataContext.RoomMembership.Remove(employment);

            try
            {
                await _tenantDataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }
    }
}