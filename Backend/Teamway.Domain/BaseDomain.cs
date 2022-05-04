namespace Teamway.Domain
{
    public abstract class BaseDomain
    {
        public int Id { get; init; }
        // just mimic optimistic lock for inMemory Database
        public byte[] RowVersion { get; init; } = new byte[] { 1 };
        public bool Deleted { get; set; }
    }
}
