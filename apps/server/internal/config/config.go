package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type ServerConfig struct {
	Port string
	Host string
}


type DatabaseConfig struct {
	User 			string
	Password 		string
	Host        	string
	DatabaseName 	string
}


func LoadConfig() (*ServerConfig, *DatabaseConfig) {
	// Load configuration from a file or environment variables
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal(err)
	}

	host := os.Getenv("HOST")
	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"  // Default port
	}

	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbName := os.Getenv("DB_NAME")

	return &ServerConfig{Port: port, Host: host}, &DatabaseConfig{User: dbUser, Password: dbPassword, Host: dbHost, DatabaseName: dbName}
}
