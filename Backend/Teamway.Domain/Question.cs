using System.Collections.Generic;
using System.Linq;

namespace Teamway.Domain
{
    public class Question : BaseDomain
    {
        public Question()
        {
            Answers = new List<Answer>();
        }

        public string Text { get; init; }
        public List<Answer> Answers { get; init; }
        
        public Question Clone()
        {
            var answers = Answers
                .Select(x => new Answer() { Text = x.Text, Score = x.Score })
                .ToList();
            return new Question { Text = Text, Answers = answers };
        }
    }
}