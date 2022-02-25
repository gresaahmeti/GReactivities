using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Photoies
{
    public class Details
    {
        public class Query : IRequest <Result<Photo>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Photo>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Photo>> Handle(Query request, CancellationToken cancellationToken)
            {
                var photo = await _context.Photoies.FindAsync(request.Id);

                return Result<Photo>.Success(photo);
            }
        }
    }
}