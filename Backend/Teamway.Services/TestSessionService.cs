using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Teamway.Domain;
using Teamway.Repository;
using Teamway.Services.Exceptions;
using Teamway.Services.Models;

namespace Teamway.Services
{
    internal class TestSessionService : ITestSessionService
    {
        private readonly IPersonalityTestRepository _personalityTestRepository;
        private readonly IPersonalityTraitAnalyzer _personalityTraitAnalyzer;

        public TestSessionService(
            IPersonalityTestRepository personalityTestRepository,
            IPersonalityTraitAnalyzer personalityTraitAnalyzer)
        {
            _personalityTestRepository = personalityTestRepository;
            _personalityTraitAnalyzer = personalityTraitAnalyzer;
        }

        public async Task<TestSessionModel> CreateSession(string fullName)
        {
            var questionsIds = await _personalityTestRepository.GetAllQuestionsIds();
            var session = TestSession.CreateNew(fullName);
            session.UserAnswers = questionsIds.Cast<int?>().ToDictionary(x => x.Value, x=> (int?)null);
            _personalityTestRepository.AddSession(session);
            await _personalityTestRepository.Commit();
            return session;
        }

        public async Task<TestSessionModel> GetSession(string sessionId)
        {
            return await _personalityTestRepository.GetSession(sessionId);
        }

        public async Task UpdateSession(string sessionId, UpdateTestSessionModel model)
        {
            var session = await _personalityTestRepository.GetSession(sessionId);
            if (session == null)
            {
                throw new ResourceNotFoundException();
            }
            session.UserAnswers = model.UserAnswers;
            await _personalityTestRepository.Commit();
        }

        public async Task<TestSessionModel> CommitSession(string sessionId,  UpdateTestSessionModel model)
        {
            var session =  await _personalityTestRepository.GetSession(sessionId);
            if (session == null)
            {
                throw new ResourceNotFoundException();
            }
            if (session.Completed)
                return session;
           
            session.UserAnswers = model.UserAnswers;
            await _personalityTraitAnalyzer.Analyze(session);
            session.Completed = true;
            await _personalityTestRepository.Commit();
            return session;
        }

        public async Task<List<TestQuestionModel>> GetSessionQuestions(string sessionId)
        {
            var questions = await _personalityTestRepository.GetSessionQuestions(sessionId);
            if (questions == null)
            { 
                throw new ResourceNotFoundException();
            }
            return questions.Select<Question, TestQuestionModel>(x => x).ToList();
        }
    }
}