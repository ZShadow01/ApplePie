package players

import (
	"net/http"

	"github.com/ZShadow01/ApplePie/apps/server/internal/core"
	playerrepository "github.com/ZShadow01/ApplePie/apps/server/internal/repositories/players"
	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	var param struct {
		DiscordID 	string `json:"discordId"`
		Username 	string `json:"username"`
	}

	if c.ShouldBindJSON(&param) != nil {
		c.JSON(http.StatusBadRequest, core.ErrorResponse{
			StatusCode: http.StatusBadRequest,
			Message: "Missing registration arguments",
			Code: core.ErrMissingArguments,
		})
		return
	}

	errResponse := playerrepository.NewPlayer(param.DiscordID, param.Username)

	if errResponse != nil {
		c.JSON(errResponse.StatusCode, errResponse)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
}


func GetPlayerByUUID(c *gin.Context) {
	
}
