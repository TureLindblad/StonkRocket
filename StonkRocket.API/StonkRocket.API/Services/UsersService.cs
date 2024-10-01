using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using StonkRocket.API.Models;
using System;
using static StonkRocket.API.DTO.DTO;

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

        public IResult GetStocks()
        {
            var stocks = _dbContext.Stocks;

            var response = stocks.Select(stock => new StockResponse(stock.Id, stock.Ticker)).ToList();

            return TypedResults.Ok(new GetStocksResponse(response));
        }

        public Results<Ok, NotFound, BadRequest> PostUserStock(string ticker, int userId)
        {
            var hasStock = _dbContext.UserStocks
                .Any(us => us.Stock.Ticker == ticker && us.UserId == userId);

            if (hasStock) return TypedResults.BadRequest();

            var stock = _dbContext.Stocks.FirstOrDefault(s => s.Ticker == ticker);

            if (stock == null) return TypedResults.NotFound();

            _dbContext.UserStocks.Add(new UserStock { UserId = userId, StockId = stock.Id });

            _dbContext.SaveChanges();

            return TypedResults.Ok();
        }

        public Results<Ok, NotFound> DeleteUserStock(string ticker, int userId)
        {
            var userStockToBeDeleted = _dbContext.UserStocks
                .Include(us => us.Stock)
                .FirstOrDefault(us => us.Stock.Ticker == ticker && us.UserId == userId);

            if (userStockToBeDeleted == null) return TypedResults.NotFound();

            _dbContext.UserStocks.Remove(userStockToBeDeleted);

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

        public Results<Ok<ValidateUserResponse>, BadRequest> ValidateUser(string userName)
        {
            var user = _dbContext.Users.FirstOrDefault(user => user.Name == userName);

            if (user == null) return TypedResults.BadRequest();

            return (TypedResults.Ok(new ValidateUserResponse(user.Id)));
        }
    }
}
