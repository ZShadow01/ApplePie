package playerrepository

import (
	"fmt"
	"log"
	"net/http"
	"regexp"

	"github.com/ZShadow01/ApplePie/apps/server/internal/core"
	"github.com/ZShadow01/ApplePie/apps/server/internal/db"
	"github.com/go-sql-driver/mysql"
	"github.com/google/uuid"
)

var duplicateEntryRegex = regexp.MustCompile(`for key '([^']+)'`)

func NewPlayer(discordID string, username string) *core.ErrorResponse {
	id := uuid.New()

	_, err := db.Exec("INSERT INTO players (uuid, discord_id, username) VALUES(?, ?, ?)", id[:], discordID, username)

	if err != nil {
		mysqlError, ok := err.(*mysql.MySQLError)

		if !ok {
			log.Printf("Player Registration Error: %v", err)
			return &core.ErrorResponse{
				StatusCode: http.StatusInternalServerError,
				Code: core.ErrInternalServer,
				Message: "An unexpected error occurred while registering the user",
			}
		}

		// Duplicate Entry
		if mysqlError.Number == 1062 {
			match := duplicateEntryRegex.FindStringSubmatch(mysqlError.Message)
	
			if len(match) > 1 {
				conflictingKey := match[1]

				var code int
				if conflictingKey == "discord_id" {
					code = core.ErrPlayerDuplicateDiscordID
				} else if conflictingKey == "username" {
					code = core.ErrPlayerDuplicateUsername
				}

				return &core.ErrorResponse{
					StatusCode: http.StatusConflict,
					Code: code,
					Message: fmt.Sprintf("A player with this %s already exists", conflictingKey),
					Details: core.ErrorResponseDetails{
						Field:conflictingKey,
					},
				}
			}
		}

		return &core.ErrorResponse{
			StatusCode: http.StatusInternalServerError,
			Code: core.ErrInternalServer,
			Message: "An unexpected error occurred while registering the user",
		}
	}

	return nil
}
