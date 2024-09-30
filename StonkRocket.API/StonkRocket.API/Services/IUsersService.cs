using Microsoft.AspNetCore.Http.HttpResults;
using static StonkRocket.API.DTO.DTO;

namespace StonkRocket.API.Services
{
    public interface IUsersService
    {
        Results<Ok, NotFound, BadRequest, ProblemHttpResult> DeleteUserStock(string ticker, int userId);
        IResult GetStocks();
        Results<Ok<GetUserByIdResponse>, NotFound> GetUserByID(int id);
        Results<Ok<ValidateUserResponse>, BadRequest> ValidateUser(string userName);
        Results<Ok, NoContent> PostStock(string ticker);
        Results<Ok, NotFound, BadRequest, ProblemHttpResult> PostUserStock(string ticker, int userId);
    }
}