package main

import (
	"github.com/ZShadow01/ApplePie/server/internal/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	config := LoadConfig()

	// Create a new server router
	server := gin.Default()

	// Register the server routes
	routes.RegisterPlayersRoutes(server)

	// Run the server
	server.Run(config.Host + ":" + config.Port)
}
