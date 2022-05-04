using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Teamway.Domain;

namespace Teamway.Repository
{
    internal class PersonalityTestRepository : IPersonalityTestRepository
    {
        private readonly PersonalityTestContext _context;

        public PersonalityTestRepository(PersonalityTestContext context)
        {
            _context = context;
        }

        public async Task<List<Question>> GetAllQuestions()
        {
            return await _context.Questions
                .Where(x => !x.Deleted)
                .ToListAsync();
        }

        public async Task<List<int>> GetAllQuestionsIds()
        {
            return await _context.Questions
                   .Where(x => !x.Deleted)
                   .Select(x => x.Id)
                   .ToListAsync();
        }

        public async Task<List<Question>> GetSessionQuestions(string sessionId)
        {
            var session = await GetSession(sessionId);
            return session != null
                ? await _context.Questions.Where(x => session.UserAnswers.Select(x => x.Key).Contains(x.Id))
                    .ToListAsync()
                : null;
        }

        public async Task<Question> SaveQuestion(Question question)
        {
            var questionExists = question.Id > 0;
            var newQuestion = question;
            if (questionExists)
            {
                var previousQuestionVersion = await _context.Questions.FindAsync(question.Id);
                if (previousQuestionVersion != null && !previousQuestionVersion.Deleted)
                    previousQuestionVersion.Deleted = true;
                newQuestion = question.Clone();
            }
             _context.Questions.Add(newQuestion);
            return newQuestion;
        }

        public void DeleteQuestion(Question question)
        {
            question.Deleted = true;
           
        }

        public async Task<Question> GetQuestion(int questionId)
        {
            return await _context.Questions.FirstOrDefaultAsync(x => x.Id == questionId);
        }

        public async Task<List<PersonalityTrait>> GetAllPersonalityTraits()
        {
            return await _context.PersonalityTraits
                .Where(x => !x.Deleted)
                .ToListAsync();
        }

        public void AddSession(TestSession session)
        {
            _context.TestSessions.Add(session);
        }

        public async Task<TestSession> GetSession(string sessionId)
        {
            return await _context.TestSessions
                .Include(x=>x.PersonalityTrait)
                .FirstOrDefaultAsync(x => x.SessionId == sessionId);
        }

        public async Task Commit() => await _context.SaveChangesAsync();
    }
}