EXT :=
ifeq ($(shell go env GOOS), windows)
	EXT := .exe
endif

run: build
	./bin/server

build:
	go build -o bin/server$(EXT) cmd/server/main.go cmd/server/config.go
