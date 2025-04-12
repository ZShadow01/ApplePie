package core

type ErrorCode int

const (
	ErrMissingArguments         = 100
	ErrInternalServer           = 101
	ErrPlayerDuplicateUsername  = 110
	ErrPlayerDuplicateDiscordID = 111
)

type ErrorResponseDetails struct {
	Field string `json:"field,omitempty"`
}

type ErrorResponse struct {
	StatusCode int                  `json:"status"`
	Code       int                  `json:"code"`
	Message    string               `json:"message"`
	Details    ErrorResponseDetails `json:"details,omitempty"`
}
