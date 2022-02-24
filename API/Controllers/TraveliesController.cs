using System;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Travelies;


namespace API.Controllers
{
    [AllowAnonymous]
    public class TraveliesController : BaseApiController
    {
        [HttpGet]

        public async Task<IActionResult> GetTravelies()
        {
            return HandleResult( await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetTravel(Guid id)
        {
            return HandleResult (await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task <IActionResult> CreateTravel(Travel travel)
        {
          return HandleResult (await Mediator.Send(new CreateT.Command {Travel = travel}));
        }

        [HttpPut("{id}")]
        public async Task <IActionResult> EditTravel (Guid id, Travel travel)
        {
            travel.Id= id;
            return HandleResult (await Mediator.Send(new Edit.Command{Travel = travel}));
        }

        [HttpDelete("{id}")]
        public async Task <IActionResult> DeleteTravel(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}