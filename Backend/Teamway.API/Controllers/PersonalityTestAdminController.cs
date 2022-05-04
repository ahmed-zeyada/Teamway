using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Teamway.Services;
using Teamway.Services.Models;

namespace Teamway.API.Controllers
{
    [Route("test/personality/admin")]
    public class PersonalityTestAdminController : Controller
    {
        private readonly IAdminService _adminService;
        public PersonalityTestAdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("questions")]
        public async Task<IActionResult> GetQuestions()
        {
            return Json(await _adminService.GetAllQuestions());
        }

        [HttpGet("traits")]
        public async Task<IActionResult> GetPersonalityTraits()
        {
            return Json(await _adminService.GetAllPersonalityTraits());
        }

        [HttpPost("question")]
        public async Task<IActionResult> SaveQuestion([FromBody]AdminQuestionModel question)
        {
            var savedQuestion = await _adminService.SaveQuestion(question);
            return Json(savedQuestion);
        }

        [HttpDelete("question/{questionId}")]
        public async Task<IActionResult> Delete(int questionId)
        {
             await _adminService.DeleteQuestion(questionId);
            return Ok();
        }
    }
}