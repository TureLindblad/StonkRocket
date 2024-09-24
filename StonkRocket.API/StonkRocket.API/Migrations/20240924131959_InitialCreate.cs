using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StonkRocket.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StockDashboards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockDashboards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stocks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Ticker = table.Column<string>(type: "TEXT", nullable: true),
                    Open = table.Column<double>(type: "REAL", nullable: false),
                    High = table.Column<double>(type: "REAL", nullable: false),
                    Low = table.Column<double>(type: "REAL", nullable: false),
                    Close = table.Column<double>(type: "REAL", nullable: false),
                    Volume = table.Column<double>(type: "REAL", nullable: false),
                    VolumeWeightedAveragePrice = table.Column<double>(type: "REAL", nullable: false),
                    Transactions = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stocks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    StockDashboardId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_StockDashboards_StockDashboardId",
                        column: x => x.StockDashboardId,
                        principalTable: "StockDashboards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StockStockDashboard",
                columns: table => new
                {
                    StockDashboardsId = table.Column<int>(type: "INTEGER", nullable: false),
                    StocksId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockStockDashboard", x => new { x.StockDashboardsId, x.StocksId });
                    table.ForeignKey(
                        name: "FK_StockStockDashboard_StockDashboards_StockDashboardsId",
                        column: x => x.StockDashboardsId,
                        principalTable: "StockDashboards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StockStockDashboard_Stocks_StocksId",
                        column: x => x.StocksId,
                        principalTable: "Stocks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StockStockDashboard_StocksId",
                table: "StockStockDashboard",
                column: "StocksId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_StockDashboardId",
                table: "Users",
                column: "StockDashboardId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StockStockDashboard");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Stocks");

            migrationBuilder.DropTable(
                name: "StockDashboards");
        }
    }
}
