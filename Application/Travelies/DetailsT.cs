using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Travelies
{
    public class Details
    {
        public class Query : IRequest <Result<Travel>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Travel>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Travel>> Handle(Query request, CancellationToken cancellationToken)
            {
                var travel = await _context.Travelies.FindAsync(request.Id);

                return Result<Travel>.Success(travel);
            }
        }
    }
}