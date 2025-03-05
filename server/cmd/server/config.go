package main

import "os"

type ServerConfig struct {
	Port string
	Host string
}

func LoadConfig() (*ServerConfig) {
	// Load configuration from a file or environment variables
	host := os.Getenv("HOST")
	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"  // Default port
	}

	return &ServerConfig{Port: port, Host: host}
}
