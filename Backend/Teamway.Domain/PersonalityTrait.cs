namespace Teamway.Domain
{
    public class PersonalityTrait : BaseDomain
    {
        public string Trait { get; set; }
        public int ScoreBandFrom { get; set; }
        public int ScoreBandTo { get; set; }

        public PersonalityTrait Clone()
        {
            return new PersonalityTrait()
            {
                ScoreBandFrom = ScoreBandFrom,
                ScoreBandTo = ScoreBandTo,
                Trait = Trait
            };
        }
    }
}
