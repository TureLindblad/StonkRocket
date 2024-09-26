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
                    us.Stock.Ticker)
                ).ToList());

            return TypedResults.Ok(response);
        }

        public Results<Ok, NotFound, BadRequest> UpdateUserStocks(string ticker, int userId)
        {
            var user = _dbContext.Users
                .Include(user => user.UserStocks)
                .ThenInclude(userStocks => userStocks.Stock)
                .FirstOrDefault(user => user.Id == userId);

            if (user == null) return TypedResults.NotFound();

            var existingStock = _dbContext.Stocks.Any(s => s.Ticker == ticker);

            if (!existingStock) return TypedResults.BadRequest(); 

            var hasStock = user.UserStocks.Any(us => us.Stock.Ticker == ticker);

            if (hasStock) return TypedResults.BadRequest();

            var stock = _dbContext.Stocks.FirstOrDefault(s => s.Ticker == ticker);

            _dbContext.UserStocks.Add( new UserStock { UserId = userId, StockId = stock.Id } );

            _dbContext.SaveChanges();

            return TypedResults.Ok();

        }

        public Results<Ok, NoContent> PostStock(string ticker)
        {
            // This function does not ensure that the stock exists on polygon
            // Due to limitations on API key for requests
            var existingStock = _dbContext.Stocks.Any(a => a.Ticker == ticker);

            if(existingStock)
            {
                return TypedResults.NoContent();
            }

            var newStock = new Stock
            {
                Ticker = ticker,
            };

            _dbContext.Stocks.Add(newStock);
            _dbContext.SaveChanges();

            return TypedResults.Ok();
        }
    }
}
