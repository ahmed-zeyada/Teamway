using System.Threading.Tasks;
using Teamway.Domain;

namespace Teamway.Services
{
    public interface IPersonalityTraitAnalyzer
    {
        Task Analyze(TestSession session);
    }
}