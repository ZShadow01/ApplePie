EXT :=
ifeq ($(shell go env GOOS), windows)
	EXT := .exe
endif


build:
	go build -o bin/server$(EXT) cmd/server/main.go


run: build
	./bin/server


dev:
	go run cmd/server/main.go
