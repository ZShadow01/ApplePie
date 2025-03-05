package routes

import "github.com/gin-gonic/gin"

func RegisterPlayersRoutes(r *gin.Engine) {
	playersRoutes := r.Group("/players")
    {
        playersRoutes.GET("/player/:id", func(c *gin.Context) {
            playerID := c.Param("id")

            c.JSON(200, gin.H{
                "id":       playerID,
                "username": "Nothing",
            })
        })
    }
}
