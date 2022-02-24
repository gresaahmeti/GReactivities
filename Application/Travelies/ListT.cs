using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Travelies
{
    public class List
    {
        public class Query : IRequest<Result<List<Travel>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Travel>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Travel>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Travel>>.Success( await _context.Travelies.ToListAsync(cancellationToken));
            }
        }
    }
}