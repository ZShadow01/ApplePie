package routes

import (
	"fmt"
	"net/http"

	"github.com/ZShadow01/ApplePie/server/internal/repository"
	"github.com/gin-gonic/gin"
)


type registerRequest struct {
	DiscordID 	string `json:"discordID"`
	Username 	string `json:"username"`
}


func RegisterPlayersRoutes(r *gin.RouterGroup) {
	playersRoutes := r.Group("/players")
    {
        playersRoutes.GET("/player/:id", func(c *gin.Context) {
            playerID := c.Param("id")

			player, err := repository.GetPlayerByID(playerID)

			if err != nil {
                c.JSON(http.StatusNotFound, gin.H{"error": "Player not found"})
                return
            }

            c.JSON(http.StatusOK, player)
        })

		playersRoutes.POST("/register", func(c *gin.Context) {
			var req registerRequest

			if err := c.ShouldBindJSON(&req); err != nil {
                c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
                return
            }

			err := repository.CreatePlayer(req.DiscordID, req.Username)
			if err != nil {
				fmt.Println(err.Error())
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register player"})
                return
			}

			c.JSON(http.StatusOK, gin.H{"message": "Player registered successfully"})
        })
    }
}
