using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Warehouse.Contexts;
using Warehouse.Models;

namespace Warehouse.Services
{
    public interface IModuleService
    {
        Task<IList<ModuleViewModel>> GetAllModulesAsync(Guid projectId);
        Task<bool> CreateModuleAsync(CreateModule createModule);
        Task<bool> DeleteModuleASync(Module module);
        // Task<bool> AddJobAsync(Guid moduleId, Guid jobId);
        // Task<bool> RemoveJobAsync(Guid moduleId, Guid jobId);
    }
    
    public class ModuleService : IModuleService
    {
        private readonly TenantDataContext _tenantDataContext;

        public ModuleService(TenantDataContext tenantDataContext)
        {
            _tenantDataContext = tenantDataContext;
        }
        
        public async Task<IList<ModuleViewModel>> GetAllModulesAsync(Guid projectId)
        {
            return await _tenantDataContext.Modules.Select(module => new ModuleViewModel()
            {
                Id = module.Id,
                Name = module.Name,
                JobCount = module.Jobs.Count
            }).ToListAsync();
        }

        public async Task<bool> CreateModuleAsync(CreateModule createModule)
        {
            var module = await _tenantDataContext.Modules.FirstOrDefaultAsync(x => x.Name == createModule.Module.Name);

            if (module != null)
            {
                Console.WriteLine("There's a module with the name already");
                return false;
            }

            var project = await _tenantDataContext.Projects.FirstOrDefaultAsync(x => x.Id == createModule.ProjectId);

            if (project == null)
            {
                Console.WriteLine("project does not exist");
                return false;
            }

            createModule.Module.Project = project;

            await _tenantDataContext.Modules.AddAsync(createModule.Module);
            
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

        public async Task<bool> DeleteModuleASync(Module module)
        {
            var moduleCheck = await _tenantDataContext.Modules.FirstOrDefaultAsync(x => x.Name == module.Name);

            if (moduleCheck == null)
            {
                Console.WriteLine("Module doesn't exist");
                return false;
            }

            _tenantDataContext.Remove(module);
            
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