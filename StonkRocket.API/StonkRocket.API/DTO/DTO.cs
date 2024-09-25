namespace StonkRocket.API.DTO
{
    public static class DTO
    {
        public record GetUserByIdResponse(int Id, string Name, IEnumerable<StockResponse> Stocks);
        public record StockResponse(int Id, string Ticker, double Open);
        public record PostUserStockRequest (int StockId);

    }
}
