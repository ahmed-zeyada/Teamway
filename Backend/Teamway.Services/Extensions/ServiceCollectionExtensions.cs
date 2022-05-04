using Microsoft.Extensions.DependencyInjection;

namespace Teamway.Services
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<IPersonalityTraitAnalyzer,  PersonalityTraitAnalyzer>();
            services.AddScoped<ITestSessionService, TestSessionService>();
            return services;
        }
    }
}