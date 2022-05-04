using System.Collections.Generic;
using System.Threading.Tasks;
using Teamway.Services.Models;

namespace Teamway.Services
{
    public interface ITestSessionService
    {
        Task<TestSessionModel> CreateSession(string fullName);
        Task<List<TestQuestionModel>> GetSessionQuestions(string sessionId);
        Task<TestSessionModel> GetSession(string sessionId);
        Task UpdateSession(string sessionId,UpdateTestSessionModel model);
        Task<TestSessionModel> CommitSession(string sessionId, UpdateTestSessionModel model);
    }
}