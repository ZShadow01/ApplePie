package main

import "os"

type Config struct {
	ServerPort string
}

func LoadConfig() (*Config) {
	// Load configuration from a file or environment variables
	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"  // Default port
	}

	return &Config{ServerPort: port}
}
