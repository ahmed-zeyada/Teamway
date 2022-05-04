using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Teamway.Domain;
using Teamway.Repository;
using Teamway.Services.Exceptions;
using Teamway.Services.Models;

namespace Teamway.Services
{
    internal class AdminService : IAdminService
    {
        private readonly IPersonalityTestRepository _personalityTestRepository;

        public AdminService(IPersonalityTestRepository personalityTestRepository)
        {
            _personalityTestRepository = personalityTestRepository;
        }

        public async Task<List<AdminQuestionModel>> GetAllQuestions()
        {
            var questions = await _personalityTestRepository.GetAllQuestions();
            return questions.Select<Question, AdminQuestionModel>(x => x).ToList();
        }

        public async Task<List<AdminPersonalityTraitModel>> GetAllPersonalityTraits()
        {
            var traits = await _personalityTestRepository.GetAllPersonalityTraits();
            return traits.Select<PersonalityTrait, AdminPersonalityTraitModel>(x => x)
                .OrderBy(x=>x.From)
                .ToList();
        }

        public async Task<AdminQuestionModel> SaveQuestion(AdminQuestionModel question)
        {
            var savedQuestion = await _personalityTestRepository.SaveQuestion(question);
            await _personalityTestRepository.Commit();
            return savedQuestion;
        }

        public async Task DeleteQuestion(int questionId)
        {
            var question = await _personalityTestRepository.GetQuestion(questionId);
            if (question == null)
            {
                throw new ResourceNotFoundException();
            }
              _personalityTestRepository.DeleteQuestion(question);
            await _personalityTestRepository.Commit();
        }
    }
}