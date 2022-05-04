using System.Collections.Generic;
using Teamway.Domain;

namespace Teamway.Services.Models
{
    public class AdminQuestionModel
    {
        public AdminQuestionModel()
        {
            Answers = new List<Answer>();
        }

        public int Id { get; init; }
        public byte[] RowVersion { get; init; }
        public string Text { get; init; }
        public List<Answer> Answers { get; init; }

        public static implicit operator Question(AdminQuestionModel question)
        {
            return new Question()
            {
                Id = question.Id,
                RowVersion = question.RowVersion,
                Text = question.Text,
                Answers = question.Answers
            };
        }

        public static implicit operator AdminQuestionModel(Question question)
        {
            return question == null
                ? default(AdminQuestionModel)
                : new AdminQuestionModel()
                {
                    Id = question.Id,
                    RowVersion = question.RowVersion,
                    Text = question.Text,
                    Answers = question.Answers
                };
        }
    }
}