using System.Collections.Generic;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Teamway.Domain;

namespace Teamway.Repository
{
    public class PersonalityTestContext : DbContext
    {
        public PersonalityTestContext(DbContextOptions<PersonalityTestContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Question>().Property(x => x.Answers).HasConversion(v =>
                JsonSerializer.Serialize(v, null),
                v => JsonSerializer.Deserialize<List<Answer>>(v, null));
            modelBuilder.Entity<Question>(x => x.Property(x => x.RowVersion).IsRowVersion());
            modelBuilder.Entity<TestSession>(x => x.Property(x => x.RowVersion).IsRowVersion());
            modelBuilder.Entity<TestSession>().Property(x => x.UserAnswers).HasConversion(v =>
               JsonSerializer.Serialize(v, null),
               v => JsonSerializer.Deserialize<Dictionary<int,int?>>(v, null));
            modelBuilder.Entity<PersonalityTrait>(x => x.Property(x => x.RowVersion).IsRowVersion());
            modelBuilder.Entity<Question>().HasData(SeedData.Questions);
            modelBuilder.Entity<PersonalityTrait>().HasData(SeedData.PersonalityTraits);
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Question> Questions { get; set; }
        public DbSet<TestSession> TestSessions { get; set; }
        public DbSet<PersonalityTrait> PersonalityTraits { get; set; }
    }
}