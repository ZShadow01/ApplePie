package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)


func RegisterPlayersRoutes(r *gin.Engine) {
	playersRoutes := r.Group("/players")
	{
		playersRoutes.GET("/player/:id", func(c *gin.Context) {
			playerID := c.Param("id")

			c.JSON(http.StatusOK, gin.H {
				"id": playerID,
				"username": "Nothing",
			})
		})
	}
}