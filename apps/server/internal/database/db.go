package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/ZShadow01/ApplePie/server/internal/config"
	"github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var DB *sql.DB


func loadConfig() *mysql.Config {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal(err)
	}

	// Create configuration object
	return &mysql.Config {
		User: os.Getenv("DB_USER"),
		Passwd: os.Getenv("DB_PASSWORD"),
		Net: "tcp",
		Addr: os.Getenv("DB_HOST"),
		DBName: os.Getenv("DB_NAME"),
		AllowNativePasswords: true,
		ParseTime: true,
	}
}

func ConnectDB(cfg *config.DatabaseConfig) {
	// Load the database configuration
	config := mysql.Config{
		User: cfg.User,
		Passwd: cfg.Password,
        Net: "tcp",
        Addr: cfg.Host,
        DBName: cfg.DatabaseName,
        AllowNativePasswords: true,
		ParseTime: true,
	}

	// Connect to the database
	var err error
	DB, err = sql.Open("mysql", config.FormatDSN())

	if err != nil {
		log.Fatal(err)
	}

	// Check the database connection
	pingErr := DB.Ping()
	if pingErr != nil {
        log.Fatal(pingErr)
    }

	fmt.Println("Connected to the database!")
}
