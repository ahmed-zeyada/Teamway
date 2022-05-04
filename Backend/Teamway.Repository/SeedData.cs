using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teamway.Domain;

namespace Teamway.Repository
{
    public static class SeedData
    {
        public static List<Question> Questions => new List<Question>() {

            new Question()
            {
                Id = 1,
                Text = "You’re really busy at work and a colleague is telling you their life story and personal woes. You:",
                Answers = new List<Answer>()
                {
                    new Answer()
                    {
                        Score = -1,
                        Text = "Don’t dare to interrupt them"
                    },
                    new Answer()
                    {
                        Score = 3,
                        Text = "Think it’s more important to give them some of your time; work can wait"
                    },
                    new Answer()
                    {
                        Score = -5,
                        Text = "Listen, but with only with half an ear"
                    }
                }
            },
            new Question()
            {
                Id = 2,
                Text = "You’ve been sitting in the doctor’s waiting room for more than 25 minutes. You:",
                Answers = new List<Answer>()
                {
                    new Answer()
                    {
                        Score = 2,
                        Text = "Look at your watch every two minutes"
                    },
                    new Answer()
                    {
                        Score = -2,
                        Text = "Bubble with inner anger, but keep quiet"
                    },
                    new Answer()
                    {
                        Score = -2,
                        Text = "Complain in a loud voice, while tapping your foot impatiently"
                    }
                }
            },
            new Question()
            {
                Id = 3,
                Text = "You’re having an animated discussion with a colleague regarding a project that you’re in charge of. You:",
                Answers = new List<Answer>()
                {
                    new Answer()
                    {
                        Score = 1,
                        Text = "Don’t dare contradict them"
                    },
                    new Answer()
                    {
                        Score = -1,
                        Text = "Defend your own point of view, tooth and nail"
                    },
                    new Answer()
                    {
                        Score = 5,
                        Text = "Continuously interrupt your colleague"
                    }
                }
            },
            new Question()
            {
                Id = 4,
                Text = "You are taking part in a guided tour of a museum. You:",
                Answers = new List<Answer>()
                {
                    new Answer()
                    {
                        Score = -1,
                        Text = "Are a bit too far towards the back so don’t really hear what the guide is saying"
                    },
                    new Answer()
                    {
                        Score = 1,
                        Text = "Follow the group without question"
                    },
                    new Answer()
                    {
                        Score = -4,
                        Text = "Make sure that everyone is able to hear properly"
                    }
                }
            },
            new Question()
            {
                Id = 5,
                Text = "During dinner parties at your home, you have a hard time with people who:",
                Answers = new List<Answer>()
                {
                    new Answer()
                    {
                        Score = 1,
                        Text = "Ask you to tell a story in front of everyone else"
                    },
                    new Answer()
                    {
                        Score = -1,
                        Text = "Talk privately between themselves"
                    },
                    new Answer()
                    {
                        Score = -3,
                        Text = "Hang around you all evening"
                    }
                }
            }
        };

        public static List<PersonalityTrait> PersonalityTraits => new List<PersonalityTrait>()
        {
            new PersonalityTrait()
            {
                Id = 1,
                ScoreBandFrom = 1,
                ScoreBandTo = 10,
                Trait = "Your are most probably an extrovert"
            }, new PersonalityTrait()
            {
                Id = 2,
                ScoreBandFrom = 11,
                ScoreBandTo = 1000,
                Trait = "Your are super extrovert"
            }, new PersonalityTrait()
            {
                Id = 3,
                ScoreBandFrom = 0,
                ScoreBandTo = 0,
                Trait = "It is hard to know your traits"
            }, new PersonalityTrait()
            {
                Id = 4,
                ScoreBandFrom = -10,
                ScoreBandTo = -1,
                Trait = "Your are most probably an introvert "
            }, new PersonalityTrait()
            {
                Id = 5,
                ScoreBandFrom = -1000,
                ScoreBandTo = -11,
                Trait = "Your are super introvert "
            }
        };
    }
}
