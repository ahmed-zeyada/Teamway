using Microsoft.Extensions.DependencyInjection;

namespace Teamway.Repository
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureRepositories(this IServiceCollection services)
        {
            services.AddScoped<IPersonalityTestRepository, PersonalityTestRepository>();
            return services;
        }
    }
}