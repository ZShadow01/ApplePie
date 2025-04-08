package teams

import "github.com/gin-gonic/gin"

func RegisterTeamRoutes(api *gin.RouterGroup) {
	teamsRoute := api.Group("/teams")

	{
		teamsRoute.POST("/create", Create)
	}
}
