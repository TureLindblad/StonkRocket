using Microsoft.AspNetCore.Http.HttpResults;

namespace StonkRocket.API.Services
{
    public interface IUsersService
    {
        Results<Ok<DTO.DTO.GetUserByIdResponse>, NotFound> GetUserByID(int id);
        Results<Ok, NotFound, BadRequest> UpdateUserStocks(int stockId, int userId);
    }
}