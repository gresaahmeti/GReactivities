using Domain;
using FluentValidation;

namespace Application.Travelies
{
    public class TravelValidator : AbstractValidator<Travel>
    {
        public TravelValidator()
        {
            RuleFor (x=> x.Title).NotEmpty();
            RuleFor (x=> x.Description).NotEmpty();
            RuleFor (x=> x.Date).NotEmpty();
          //  RuleFor (x=> x.Category).NotEmpty();
            RuleFor (x=> x.City).NotEmpty();
         //   RuleFor (x=> x.Venue).NotEmpty();
        }
    }
}