using System.Collections.Generic;
using Teamway.Domain;

namespace Teamway.UnitTests
{
    public class AnalyzerTestData
    {
        public AnalyzerTestData()
        {
            UserAnswers = new Dictionary<int, int?>();
            Traits = new List<PersonalityTrait>();
        }
        public Dictionary<int, int?> UserAnswers { get; set; }
        public List<Question> Questions { get; set; }
        public List<PersonalityTrait> Traits { get; set; }
        public int ExpectedTraitId { get; set; }
    }
}