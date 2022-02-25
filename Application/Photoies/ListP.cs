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

namespace Application.Photoies
{
    public class List
    {
        public class Query : IRequest<Result<List<Photo>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Photo>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Photo>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Photo>>.Success( await _context.Photoies.ToListAsync(cancellationToken));
            }
        }
    }
}