package routes

import (
	"net/http"

	"github.com/ZShadow01/ApplePie/server/internal/repository"
	"github.com/gin-gonic/gin"
)

func RegisterPlayersRoutes(r *gin.Engine) {
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
			// TODO: Yet to be implemented
			c.JSON(http.StatusOK, gin.H{})

			// err := repository.CreatePlayer("521408201908944907", "NO")
			// if err != nil {
			// 	fmt.Println(err.Error())
			// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register player"})
            //     return
			// }

			// c.JSON(http.StatusOK, gin.H{"message": "Player registered successfully"})
        })
    }
}
