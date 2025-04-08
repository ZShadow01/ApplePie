package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Host 	string
	Port 	string
	DBHost 	string
	DBName 	string
	DBUser 	string
	DBPassword string
}

func Load() *Config {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system env vars")
	}

	var cfg Config;

	cfg.Host = os.Getenv("HOST")
	cfg.Port = os.Getenv("PORT")
	cfg.DBHost = os.Getenv("DB_HOST")
	cfg.DBName = os.Getenv("DB_NAME")
	cfg.DBUser = os.Getenv("DB_USER")
	cfg.DBPassword = os.Getenv("DB_PASSWORD")

	return &cfg;
}
