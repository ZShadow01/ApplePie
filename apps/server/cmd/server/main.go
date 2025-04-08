package main

import (
	"log"

	routes "github.com/ZShadow01/ApplePie/apps/server/internal/api"
	"github.com/ZShadow01/ApplePie/apps/server/internal/config"
	"github.com/ZShadow01/ApplePie/apps/server/internal/db"
)

func main() {
	cfg := config.Load()

	db.Init(cfg)

	log.Printf("Starting server on port %s", cfg.Port)

	server := routes.NewRouter(cfg)

	server.Run(":" + cfg.Port)
}
