﻿namespace StonkRocket.API.DTO
{
    public static class DTO
    {
        public record GetUserByIdResponse(int Id, string Name, IEnumerable<StockResponse> Stocks);
        public record ValidateUserResponse(int Id);
        public record StockResponse(int Id, string Ticker);
        public record GetStocksResponse(IEnumerable<StockResponse> Stocks);

    }
}
