package db

import (
	"database/sql"
	"log"

	"github.com/ZShadow01/ApplePie/apps/server/internal/config"
	"github.com/go-sql-driver/mysql"
)

var db *sql.DB

func Init(cfg *config.Config) {
	sqlConfig := mysql.Config{
		User: cfg.DBUser,
		Passwd: cfg.DBPassword,
		Net: "tcp",
		Addr: cfg.DBHost,
		DBName: cfg.DBName,
		AllowNativePasswords: true,
	}

	log.Println(sqlConfig.FormatDSN());

	var err error
	db, err = sql.Open("mysql", sqlConfig.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}

	if err = db.Ping(); err != nil {
		log.Fatalf("Failed to ping DB: %v", err)
	}

	log.Println("Connected to MariaDB")
}


func Exec(sql string, values ...any) (sql.Result, error) {
	return db.Exec(sql, values...)
}


func Query(sql string, values ...any) (*sql.Rows, error) {
	return db.Query(sql, values...)
}
