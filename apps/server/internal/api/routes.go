package routes

import (
	"github.com/ZShadow01/ApplePie/apps/server/internal/api/v1/players"
	"github.com/ZShadow01/ApplePie/apps/server/internal/config"
	"github.com/gin-gonic/gin"
)

func NewRouter(cfg *config.Config) *gin.Engine {
	r := gin.Default()

	api := r.Group("/api/v1")

	players.RegisterPlayerRoutes(api)

	return r
}
