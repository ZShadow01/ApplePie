package players

import "github.com/gin-gonic/gin"

func RegisterPlayerRoutes(api *gin.RouterGroup) {
	playersRoute := api.Group("/players")

	{
		playersRoute.POST("/register", Register)
		playersRoute.GET("/:uuid", GetPlayerByUUID)
	}
}
