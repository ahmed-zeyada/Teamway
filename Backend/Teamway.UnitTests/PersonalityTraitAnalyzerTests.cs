using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Moq;
using NUnit.Framework;
using Shouldly;
using Teamway.Domain;
using Teamway.Repository;
using Teamway.Services;

namespace Teamway.UnitTests
{
    [TestFixture]
    public class PersonalityTraitAnalyzerTests
    {
        private IPersonalityTraitAnalyzer _analyzer;
        private Mock<IPersonalityTestRepository> _personalityTestRepositoryMock;

        [SetUp]
        public void SetUp()
        {
            _personalityTestRepositoryMock = new Mock<IPersonalityTestRepository>();
            _analyzer = new PersonalityTraitAnalyzer(_personalityTestRepositoryMock.Object);
        }

        [Test]
        public void Analyze_UserAnswersNotCompleted_Exception()
        {
            //Arrange
            var session = TestSession.CreateNew("_");
            session.UserAnswers = new Dictionary<int, int?>()
            {
                [1] = 2,
                [2] = null,
                [3] = 1
            };
            SetupPersonalityTraits(Array.Empty<PersonalityTrait>().ToList());
            SetupSessionQuestions(Array.Empty<Question>().ToList());

            // Act
            Func<Task> action = async () => await _analyzer.Analyze(session);

            // Assert
            action.ShouldThrow<Exception>()
                .Message
                .ShouldBe("some questions have no answers");
        }

        [Test]
        public void Analyze_NoTraits_Exception()
        {
            //Arrange
            var session = TestSession.CreateNew("_");
            session.UserAnswers = new Dictionary<int, int?>()
            {
                [1] = 0,
                [2] = 0,
            };
            SetupPersonalityTraits(Array.Empty<PersonalityTrait>().ToList());
            SetupSessionQuestions(new List<Question>() {
                new Question(){ Id = 1 , Answers = new List<Answer>() { new Answer() }},
                new Question(){ Id = 2 , Answers = new List<Answer>() { new Answer() }},

            });

            // Act
            Func<Task> action = async () => await _analyzer.Analyze(session);

            // Assert
            action.ShouldThrow<Exception>()
                .Message
                .ShouldBe("Could not find trait for this session");
        }

        [TestCaseSource(nameof(GetTestCases))]
        public async Task Analyze_UserAnswersCompleted_TraitAssigned(AnalyzerTestData testData)
        {
            //Arrange
            var session = TestSession.CreateNew("_");
            session.UserAnswers = testData.UserAnswers;
            SetupPersonalityTraits(testData.Traits);
            SetupSessionQuestions(testData.Questions);

            // Act
            await _analyzer.Analyze(session);

            // Assert
            session.PersonalityTrait.ShouldNotBeNull();
            session.PersonalityTrait.Id.ShouldBe(testData.ExpectedTraitId);
        }

        private void SetupPersonalityTraits(List<PersonalityTrait> traits)
        {
            _personalityTestRepositoryMock.Setup(x => x.GetAllPersonalityTraits())
                .ReturnsAsync(traits);
        }

        private void SetupSessionQuestions(List<Question> questions)
        {
            _personalityTestRepositoryMock.Setup(x => x.GetSessionQuestions(It.IsAny<string>()))
                .ReturnsAsync(questions);
        }

        private static IEnumerable<AnalyzerTestData> GetTestCases()
        {
            // here we can add more test cases
            yield return new AnalyzerTestData()
            {
                UserAnswers = new Dictionary<int, int?>()
                {
                    [1] = 0,
                    [2] = 1,
                    [3] = 1,
                },
                Questions = new List<Question>() {
                    new Question()
                {
                    Id = 1,
                    Answers = new List<Answer>()
                    {
                        new Answer() { Score = -1 },
                        new Answer() { Score = 1 }
                    }
                },
                    new Question()
                {
                    Id = 2,
                    Answers = new List<Answer>()
                    {
                        new Answer() { Score = 5 },
                        new Answer() { Score = 1 }
                    }
                },
                    new Question()
                {
                    Id = 3,
                    Answers = new List<Answer>()
                    {
                        new Answer() { Score = -1 },
                        new Answer() { Score = 1 }
                    }
                }
                },
                Traits = new List<PersonalityTrait>()
                {
                    new PersonalityTrait()
                    {
                        Id = 1,
                        ScoreBandFrom = 1,
                        ScoreBandTo = 10,
                        Trait = "extro"
                    },
                    new PersonalityTrait()
                    {
                        Id = 2,
                        ScoreBandFrom = -10,
                        ScoreBandTo = 0,
                        Trait = "intro"
                    }
                },
                ExpectedTraitId = 1
            };
        }
    }
}