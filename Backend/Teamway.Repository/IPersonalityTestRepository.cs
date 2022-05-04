using System.Collections.Generic;
using System.Threading.Tasks;
using Teamway.Domain;

namespace Teamway.Repository
{
    public interface IPersonalityTestRepository
    {
        void DeleteQuestion(Question question);
        Task<Question> GetQuestion(int questionId);
        Task<List<PersonalityTrait>> GetAllPersonalityTraits();
        Task<List<Question>> GetAllQuestions();
        Task<List<int>> GetAllQuestionsIds();
        Task<List<Question>> GetSessionQuestions(string sessionId);
        Task<Question> SaveQuestion(Question question);
        void AddSession(TestSession session);
        Task<TestSession> GetSession(string sessionId);
        Task Commit();
    }
}
