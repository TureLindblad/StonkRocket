using Microsoft.AspNetCore.Mvc;
using StonkRocket.API.Services;

namespace StonkRocket.API
{
    public static class Endpoints
    {
        public static void MapEndpoints(this IEndpointRouteBuilder app)
        {
            MapStockEndpoints(app);
            MapUserEndpoints(app);
        }

        private static void MapStockEndpoints(IEndpointRouteBuilder app)
        {
            app.MapGet("/stocks", (IUsersService usersService)
                => usersService.GetStocks())
                .WithDescription("Retrieves all stocks listed in database")
                .WithTags("Stocks");

            app.MapPost("/stock/{ticker}", (IUsersService userService, string ticker)
                => userService.PostStock(ticker))
                .WithDescription("Posts stocks using ticker identifier to database")
                .WithTags("Stocks");
        }

        private static void MapUserEndpoints(IEndpointRouteBuilder app)
        {
            app.MapGet("/user/{userId}", (IUsersService usersService, int userId)
                => usersService.GetUserByID(userId))
                .WithDescription("Retrieves users by ID from database")
                .WithTags("Users");

            app.MapGet("/user/validate/{username}", (IUsersService usersService, string username)
                => usersService.ValidateUser(username))
                .WithDescription("Compare username sent by URL to usernames in database and send back userID")
                .WithTags("Users");

            app.MapPost("/user/stocks/{userId}", (IUsersService userService, int userId, [FromQuery] string ticker)
                => userService.PostUserStock(ticker, userId))
                .WithDescription("Posts stock using ticker identifier to user stock table in database. Matches ticker with userID")
                .WithTags("Users");

            app.MapDelete("/user/stocks/{userId}", (IUsersService userService, int userId, [FromQuery] string ticker)
                => userService.DeleteUserStock(ticker, userId))
                .WithDescription("Delete stock from user stock table in database. Matches user id to specified ticker and deletes post in database")
                .WithTags("Users");
        }
    }
}
