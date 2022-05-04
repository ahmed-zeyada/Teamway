using System.Collections.Generic;

namespace Teamway.Services.Models
{
    public class UpdateTestSessionModel
    {
        private UpdateTestSessionModel()
        {
            UserAnswers = new Dictionary<int, int?>();
        }
        public Dictionary<int, int?> UserAnswers { get; init; }
    }
}