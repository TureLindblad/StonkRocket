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
                => usersService.GetStocks());

            app.MapPost("/stock/{ticker}", (IUsersService userService, string ticker)
                => userService.PostStock(ticker));
        }

        private static void MapUserEndpoints(IEndpointRouteBuilder app)
        {
            app.MapGet("/user/{id}", (IUsersService usersService, int id)
                => usersService.GetUserByID(id));

            app.MapGet("/user/validate/{username}", (IUsersService usersService, string username)
                => usersService.ValidateUser(username));

            app.MapPost("/user/stocks/{id}", (IUsersService userService, int id, [FromQuery] string ticker)
                => userService.PostUserStock(ticker, id));

            app.MapDelete("/user/stocks/{id}", (IUsersService userService, int id, [FromQuery] string ticker)
                => userService.DeleteUserStock(ticker, id));
        }
    }
}
