package playerrepository

import (
	"github.com/ZShadow01/ApplePie/apps/server/internal/db"
	"github.com/google/uuid"
)

func NewPlayer(discordID uint64, username string) error {
	id := uuid.New()

	_, err := db.Exec("INSERT INTO players (uuid, discord_id, username) VALUES(?, ?, ?)", id[:], discordID, username)

	return err
}
