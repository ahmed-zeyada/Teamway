using System.Collections.Generic;
using System.Linq;
using Teamway.Domain;

namespace Teamway.Services.Models
{
    public class TestQuestionModel
    {
        public TestQuestionModel()
        {
            Answers = new List<KeyValuePair<int, string>>();
        }

        public int Id { get; init; }
        public string Text { get; init; }
        public List<KeyValuePair<int, string>> Answers { get; init; }

        public static implicit operator TestQuestionModel(Question question)
        {
            return question == null
                ? default(TestQuestionModel)
                : new TestQuestionModel()
                {
                    Id = question.Id,
                    Text = question.Text,
                    Answers = question.Answers.Select((x, i) => new KeyValuePair<int, string>(i, x.Text)).ToList()
                };
        }
    }
}