using Teamway.Domain;

namespace Teamway.Services.Models
{
    public class AdminPersonalityTraitModel
    {
        public int Id { get; init; }
        public byte[] RowVersion { get; init; }
        public string Text { get; init; }
        public int From { get; init; }
        public int To { get; init; }

        public static implicit operator AdminPersonalityTraitModel(PersonalityTrait personalityTrait)
        {
            return personalityTrait == null
                ? default(AdminPersonalityTraitModel)
                : new AdminPersonalityTraitModel()
                {
                    Text = personalityTrait.Trait,
                    From = personalityTrait.ScoreBandFrom,
                    To = personalityTrait.ScoreBandTo,
                    Id = personalityTrait.Id,
                    RowVersion = personalityTrait.RowVersion
                };
        }
    }
}