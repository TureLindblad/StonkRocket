using Microsoft.AspNetCore.Http.HttpResults;

namespace StonkRocket.API.Services
{
    public interface IUsersService
    {
        Results<Ok, NotFound, BadRequest, ProblemHttpResult> DeleteUserStock(string ticker, int userId);
        IResult GetStocks();
        Results<Ok<DTO.DTO.GetUserByIdResponse>, NotFound> GetUserByID(int id);
        Results<Ok, NoContent> PostStock(string ticker);
        Results<Ok, NotFound, BadRequest, ProblemHttpResult> PostUserStock(string ticker, int userId);
    }
}