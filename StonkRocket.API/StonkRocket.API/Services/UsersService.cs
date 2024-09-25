using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using StonkRocket.API.Models;
using static StonkRocket.API.DTO.DTO;
using static StonkRocket.API.Program;

namespace StonkRocket.API.Services
{
    public class UsersService : IUsersService
    {
        readonly AppDbContext _dbContext;

        public UsersService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Results<Ok<GetUserByIdResponse>, NotFound> GetUserByID(int id)
        {
            var user = _dbContext.Users
                .Include(user => user.UserStocks)
                .ThenInclude(userStocks => userStocks.Stock)
                .FirstOrDefault(user => user.Id == id);

            if (user == null) return TypedResults.NotFound();

            var response = new GetUserByIdResponse(user.Id, user.Name, user.UserStocks.Select(
                us => new StockResponse(
                    us.Stock.Id,
                    us.Stock.Ticker,
                    us.Stock.Open)
                ).ToList());

            return TypedResults.Ok(response);
        }

        public Results<Ok, NotFound, BadRequest> UpdateUserStocks(int stockId, int userId)
        {
            var user = _dbContext.Users
                .Include(user => user.UserStocks)
                .ThenInclude(userStocks => userStocks.Stock)
                .FirstOrDefault(user => user.Id == userId);

            if (user == null) return TypedResults.NotFound();

            var existingStock = _dbContext.Stocks.Any(s => s.Id == stockId);

            if (!existingStock) return TypedResults.BadRequest(); 

            var hasStock = user.UserStocks.Any(us => us.Stock.Id == stockId);

            if (hasStock) return TypedResults.BadRequest();

            _dbContext.UserStocks.Add( new UserStock { UserId = userId, StockId = stockId } );

            _dbContext.SaveChanges();

            return TypedResults.Ok();

        }
    }
}
