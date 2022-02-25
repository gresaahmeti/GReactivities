using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Photoies
{
    public class Create
    {
        public class Command : IRequest <Result<Unit>>
        {
            public Photo Photo { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor( x => x.Photo).SetValidator(new PhotoValidator());
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
               _context.Photoies.Add(request.Photo);

               var result = await _context.SaveChangesAsync() >0;

               if(!result) return Result<Unit>.Failure("Failed to create photo");

               return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}