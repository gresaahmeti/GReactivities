using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;


namespace Application.Travelies
{
    public class CreateT
    {
        public class Command : IRequest <Result<Unit>>
        {
            public Travel Travel { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor( x => x.Travel).SetValidator(new TravelValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
             _context.Travelies.Add(request.Travel);

               var result = await _context.SaveChangesAsync() >0;

               if(!result) return Result<Unit>.Failure("Failed to create travel");

               return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}