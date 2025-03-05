package main

import (
	"github.com/ZShadow01/ApplePie/server/api"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	api.RegisterPlayersRoutes(router)

	router.Run("localhost:8080")
}
