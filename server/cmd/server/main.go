package main

import (
	"fmt"

	"github.com/ZShadow01/ApplePie/server/internal/database"
	"github.com/ZShadow01/ApplePie/server/internal/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	/* Initialize the database connection */
	database.ConnectDB()

	/* Create the server */
	// Load the server configuration from the .env file
	config := LoadConfig()
	fmt.Println(config)
	// Create a new server router
	server := gin.Default()

	apiRoute := server.Group("/api")

	// Register the server routes
	routes.RegisterPlayersRoutes(apiRoute)

	// Run the server
	server.Run(config.Host + ":" + config.Port)
}
