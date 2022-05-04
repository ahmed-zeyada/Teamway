using System.Collections.Generic;
using Teamway.Domain;

namespace Teamway.Services.Models
{
    public class TestSessionModel
    {
        private TestSessionModel()
        {
            UserAnswers = new Dictionary<int, int?>();
        }
     
        public string FullName { get; init; }
        public string SessionId { get; init; }
        public Dictionary<int, int?> UserAnswers { get; init; }
        public bool Completed { get; init; }
        public string Result { get; init; }

        public static implicit operator TestSessionModel(TestSession session)
        {
           return session == null
                ? default(TestSessionModel)
                : new TestSessionModel()
                {
                    FullName = session.FullName,
                    Completed = session.Completed,
                    UserAnswers = session.UserAnswers,
                    SessionId = session.SessionId,
                    Result = session.PersonalityTrait?.Trait
                };
        }
    }
}