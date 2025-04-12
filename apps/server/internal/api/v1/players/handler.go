package players

import (
	"fmt"
	"log"
	"net/http"
	"regexp"

	"github.com/ZShadow01/ApplePie/apps/server/internal/core"
	"github.com/ZShadow01/ApplePie/apps/server/internal/db"
	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
	"github.com/google/uuid"
)

var duplicateEntryRegex = regexp.MustCompile(`for key '([^']+)'`)

func Register(c *gin.Context) {
	var param struct {
		DiscordID 	string `json:"discordID"`
		Username 	string `json:"username"`
	}

	if c.ShouldBindJSON(&param) != nil {
		c.JSON(http.StatusBadRequest, core.ErrorResponse{
			Error: "BadRequest",
			Message: "Invalid input",
			Code: "MISSING_ARGUMENTS",
		})
		return
	}

	id := uuid.New()

	_, err := db.Exec("INSERT INTO players (uuid, discord_id, username) VALUES (?, ?, ?)", id[:], param.DiscordID, param.Username)

	if err != nil {
		mysqlError, ok := err.(*mysql.MySQLError)

		if !ok {
			log.Printf("Player Registration Error: %v", err)
			c.JSON(http.StatusInternalServerError, core.ErrorResponse{
				Error: "InternalServerError",
				Message: "An unexpected error occurred while registering the user",
				Code: "INTERNAL_ERROR",
			})
			return
		}

		// Duplicate Entry
		if mysqlError.Number == 1062 {
			match := duplicateEntryRegex.FindStringSubmatch(mysqlError.Message)
	
			if len(match) > 1 {
				conflictingKey := match[1]

				c.JSON(http.StatusConflict, core.ErrorResponse{
					Error: "Conflict",
					Message: fmt.Sprintf("A player with this %s already exists", conflictingKey),
					Field: conflictingKey,
					Code: "DUPLICATE_FIELD",
				})
				return
			}
		}

		c.JSON(http.StatusInternalServerError, core.ErrorResponse{
			Error: "InternalServerError",
			Message: "Something went wrong",
			Code: "INTERNAL_ERROR",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
}


func GetPlayerByUUID(c *gin.Context) {
	
}
