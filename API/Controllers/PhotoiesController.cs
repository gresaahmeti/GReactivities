using System;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Photoies;

namespace API.Controllers
{
    [AllowAnonymous]
    public class PhotoiesController : BaseApiController
    {
        [HttpGet]

        public async Task<IActionResult> GetPhoto()
        {
            return HandleResult( await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetPhoto(Guid id)
        {
            return HandleResult (await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task <IActionResult> CreatePhoto(Photo photo)
        {
            return HandleResult (await Mediator.Send(new Create.Command {Photo = photo}));
        }

        [HttpPut("{id}")]
        public async Task <IActionResult> EditPhoto (Guid id, Photo photo)
        {
            photo.Id= id;
            return HandleResult (await Mediator.Send(new Edit.Command{Photo = photo}));
        }

        [HttpDelete("{id}")]
        public async Task <IActionResult> DeletePhoto(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}