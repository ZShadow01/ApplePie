package models

import "github.com/google/uuid"

type Player struct {
	ID         uuid.UUID
	DiscordID  uint64
	Username   string
	TotalGames int
	Wins       int
	CreatedAt  string
}
