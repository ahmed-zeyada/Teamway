using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Teamway.Services;
using Teamway.Services.Models;

namespace Teamway.API.Controllers
{
    [Route("test/personality")]
    public class PersonalityTestController : Controller
    {
        private readonly ITestSessionService _testSessionService;
        
        public PersonalityTestController(ITestSessionService testSessionService)
        {
            _testSessionService = testSessionService;
        }

        [HttpPost("session")]
        public async Task<IActionResult> CreateSession([FromBody] Dictionary<string, string> model)
        {
           return Json(await _testSessionService.CreateSession(model.Values.Single()));
        }

        [HttpPut("session/{sessionId}")]
        public async Task<IActionResult> UpdateSession(string sessionId,[FromBody] UpdateTestSessionModel model)
        {
            await _testSessionService.UpdateSession(sessionId,model);
            return Ok();
        }

        [HttpPut("session/{sessionId}/commit")]
        public async Task<IActionResult> CommitSession(string sessionId, [FromBody] UpdateTestSessionModel model)
        {
           var session = await _testSessionService.CommitSession(sessionId, model);
            return Json(session);
        }

        [HttpGet("session/{sessionId}")]
        public async Task<IActionResult> GetSession(string sessionId)
        {
            var session = await _testSessionService.GetSession(sessionId);
           return session !=null 
                ? Json(session)
                : NotFound();
        }

        [HttpGet("session/{sessionId}/questions")]
        public async Task<IActionResult> UpdateSession(string sessionId)
        {
            var questions = await _testSessionService.GetSessionQuestions(sessionId);
            return Json(questions);
        }
    }
}