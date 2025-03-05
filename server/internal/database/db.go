package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var DB *sql.DB


func loadConfig() *mysql.Config {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal(err)
	}

	return &mysql.Config {
		User: os.Getenv("DB_USER"),
		Passwd: os.Getenv("DB_PASSWORD"),
		Net: "tcp",
		Addr: os.Getenv("DB_HOST"),
		DBName: os.Getenv("DB_NAME"),
		AllowNativePasswords: true,
	}
}

func ConnectDB() {
	// Load the database configuration
	config := loadConfig()

	fmt.Println(config.FormatDSN());

	var err error
	DB, err = sql.Open("mysql", config.FormatDSN())

	if err != nil {
		log.Fatal(err)
	}

	pingErr := DB.Ping()
	if pingErr != nil {
        log.Fatal(pingErr)
    }

	fmt.Println("Connected to the database!")
}
