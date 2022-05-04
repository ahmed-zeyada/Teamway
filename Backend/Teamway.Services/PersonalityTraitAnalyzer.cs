using System;
using System.Linq;
using System.Threading.Tasks;
using Teamway.Domain;
using Teamway.Repository;

namespace Teamway.Services
{
    internal class PersonalityTraitAnalyzer : IPersonalityTraitAnalyzer
    {
        private readonly IPersonalityTestRepository _personalityTestRepository;

        public PersonalityTraitAnalyzer(IPersonalityTestRepository personalityTestRepository)
        {
            _personalityTestRepository = personalityTestRepository;
        }

        public async Task Analyze(TestSession session)
        {
            var traits = await _personalityTestRepository.GetAllPersonalityTraits();
            var questions = await _personalityTestRepository.GetSessionQuestions(session.SessionId);

            if (session.UserAnswers.Any(x => !x.Value.HasValue))
                throw new Exception("some questions have no answers");

            var score = session.UserAnswers.ToList().Sum(userAnswer =>
                    questions
                    .Single(x => x.Id == userAnswer.Key)
                    .Answers[userAnswer.Value.Value].Score
            );

            var trait = traits.SingleOrDefault(x => score >= x.ScoreBandFrom && score <= x.ScoreBandTo);
            if (trait == null)
            {
                throw new Exception("Could not find trait for this session");
            }
            session.PersonalityTrait = trait;
        }
    }
}