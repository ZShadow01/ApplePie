package repository

import (
	"database/sql"
	"errors"

	"github.com/ZShadow01/ApplePie/server/internal/database"
	"github.com/ZShadow01/ApplePie/server/internal/models"
)


func CreatePlayer(id string, username string) error {
	// TODO: UNFINISHED WORK
	_, err := database.DB.Exec("INSERT INTO players (discord_id, username) VALUES (?, ?)", id, username)

	if err != nil {
		return errors.New("failed to create player: " + err.Error())
	}

	return nil
}


func GetPlayerByID(id string) (models.Player, error) {
	var player models.Player

	// Query the database for player information and populate the player model
	row := database.DB.QueryRow("SELECT * FROM players WHERE discord_id = ?", id)

	// Scan all player attributes and add to player model
	err := row.Scan(
		&player.DiscordID,
		&player.Username,
		&player.Wins,
		&player.TotalGames,
		&player.HighestWinStreak,
		&player.CurrentWinStreak,
		&player.HighestRating,
		&player.Rating,
		&player.CreatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
            return player, errors.New("player not found")
        } else {
            return player, errors.New("failed to get player: " + err.Error())
        }
    }

	return player, nil
}
