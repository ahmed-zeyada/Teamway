using System.Collections.Generic;
using System.Threading.Tasks;
using Teamway.Services.Models;

namespace Teamway.Services
{
    public interface IAdminService
    {
        Task<List<AdminQuestionModel>> GetAllQuestions();
        Task<AdminQuestionModel> SaveQuestion(AdminQuestionModel question);
        Task<List<AdminPersonalityTraitModel>> GetAllPersonalityTraits();
        Task DeleteQuestion(int questionId);
    }
}
