using System;
using System.Collections.Generic;

namespace Teamway.Domain
{
    public class TestSession : BaseDomain
    {
        private TestSession()
        {
            UserAnswers = new Dictionary<int, int?>();
        }

        public string FullName { get; init; }
        public string SessionId { get; init; }
        public Dictionary<int, int?> UserAnswers { get; set; }
        public bool Completed { get; set; }
        public PersonalityTrait PersonalityTrait { get; set; }

        public static TestSession CreateNew(string fullNme)
        {
            return new TestSession()
            {
                FullName = fullNme,
                SessionId = Guid.NewGuid().ToString()
            };
        }
    }
}
