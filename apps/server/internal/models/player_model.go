package models

import "time"

type Player struct {
	DiscordID 			string 		`json:"discordId" db:"discord_id"`
	Username  			string 		`json:"username" db:"username"`
	Wins 				int 		`json:"wins" db:"wins"`
	TotalGames			int 		`json:"totalGames" db:"total_games"`
	HighestWinStreak 	int 		`json:"highestWinStreak" db:"highest_win_streak"`
	CurrentWinStreak 	int 		`json:"currentWinStreak" db:"current_win_streak"`
	HighestRating 		int 		`json:"highestRating" db:"highest_rating"`
	Rating 				int 		`json:"rating" db:"rating"`
	CreatedAt 			time.Time 	`json:"createdAt" db:"created_at"`
}
