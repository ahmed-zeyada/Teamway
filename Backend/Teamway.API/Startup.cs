using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Teamway.API.Middleware;
using Teamway.Repository;
using Teamway.Services;

namespace Teamway.API
{
    public class Startup
    {
        const string DB_NAME = "TestDB";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<PersonalityTestContext>(options =>
                {
                    options.UseInMemoryDatabase(DB_NAME);
                    options.EnableSensitiveDataLogging();
                });

            services.AddMvc();
            services.AddControllers()
                .AddNewtonsoftJson();
            services.ConfigureApplicationServices();
            services.ConfigureRepositories();
            // just to seed database
            services.BuildServiceProvider().GetRequiredService<PersonalityTestContext>().Database.EnsureCreated();
        }
        
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }
            app.UseRouting();
            app.UseCors(x =>
            {
                x.AllowAnyOrigin();
                x.AllowAnyMethod();
                x.AllowAnyHeader();
            });

            app.UseMiddleware<ExceptionMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            CreateDatabase(app);
        }

        private void CreateDatabase(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
                scope.ServiceProvider.GetRequiredService<PersonalityTestContext>()
                    .Database.EnsureCreated();
        }
    }
}