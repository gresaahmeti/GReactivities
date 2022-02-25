using Domain;
using FluentValidation;

namespace Application.Photoies
{
    public class PhotoValidator : AbstractValidator<Photo>
    {
        public PhotoValidator()
        {
            RuleFor (x=> x.Title).NotEmpty();
            RuleFor (x=> x.Description).NotEmpty();
            RuleFor (x=> x.Date).NotEmpty();
            RuleFor (x=> x.Category).NotEmpty();
            RuleFor (x=> x.City).NotEmpty();
            RuleFor (x=> x.Venue).NotEmpty();
        }
    }
}