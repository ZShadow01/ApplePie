package main

import (
	"github.com/ZShadow01/ApplePie/server/internal/config"
	"github.com/ZShadow01/ApplePie/server/internal/database"
	"github.com/ZShadow01/ApplePie/server/internal/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	// Load the server configuration from the .env file
	serverConfig, databaseConfig := config.LoadConfig()
	
	/* Initialize the database connection */
	database.ConnectDB(databaseConfig)

	// Create a new server router
	server := gin.Default()

	apiRoute := server.Group("/api")

	// Register the server routes
	routes.RegisterPlayersRoutes(apiRoute)

	// Run the server
	server.Run(serverConfig.Host + ":" + serverConfig.Port)
}
