using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Warehouse.Models;
using Warehouse.Services;

namespace Warehouse
{
    public static class MultiTenancyExtensions
    {
        public static TenantBuilder<T> AddMultiTenancy<T>(this IServiceCollection services) where T : TenantConfig
            => new TenantBuilder<T>(services);
            
        public static TenantBuilder<TenantConfig> AddMultiTenancy(this IServiceCollection services) 
            => new TenantBuilder<TenantConfig>(services);
    }
    
    public class TenantBuilder<T> where T : TenantConfig
    {
        private readonly IServiceCollection _services;

        public TenantBuilder(IServiceCollection services)
        {
            services.AddTransient<TenantService>();
            _services = services;
        }
        
        
        // Adding Resolution strategy to builder
        public TenantBuilder<T> WithResolutionStrategy<V>(ServiceLifetime lifetime = ServiceLifetime.Transient) where V : class, ITenantResolutionStrategy
        {
            _services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            _services.Add(ServiceDescriptor.Describe(typeof(ITenantResolutionStrategy), typeof(V), lifetime));
            return this;
        }
        
        // Adding tenant store to builder
        // public TenantBuilder<T> WithStore<V>(ServiceLifetime lifetime = ServiceLifetime.Transient) where V : class, ITenantStore<T>
        // {
        //     _services.Add(ServiceDescriptor.Describe(typeof(ITenantStore<T>), typeof(V), lifetime));
        //     return this;
        // }
    }
}