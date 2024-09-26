using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StonkRocket.API.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedStockModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Close",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "High",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "Low",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "Open",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "Transactions",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "Volume",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "VolumeWeightedAveragePrice",
                table: "Stocks");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Close",
                table: "Stocks",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "High",
                table: "Stocks",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Low",
                table: "Stocks",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Open",
                table: "Stocks",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "Transactions",
                table: "Stocks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Volume",
                table: "Stocks",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "VolumeWeightedAveragePrice",
                table: "Stocks",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
