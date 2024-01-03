package middleware

import (
	"fmt"
	"net/http"
	"os"
	"time"
	"todoList-app/models"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func CheckJWTMiddleware(c *gin.Context) {
	fmt.Println("Handling JWT check")

	// Retrieve the JWT from the cookie
	token, err := c.Cookie("Auth")
	if err != nil || token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		c.Abort()
		return
	}

	// Parse and validate the JWT
	claims := jwt.MapClaims{}
	secretKey := []byte(os.Getenv("SECRET"))
	parsedToken, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		// Provide the secret key for validation
		return secretKey, nil
	})

	// Check token expiration
	expiration, ok := claims["exp"].(float64)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token expiration not found"})
		c.Abort()
		return
	}
	expirationTime := time.Unix(int64(expiration), 0)
	if time.Now().After(expirationTime) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token has expired"})
		c.Abort()
		return
	}

	if err != nil || !parsedToken.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		c.Abort()
		return
	}

	// Find the user
	var user models.User
	if err := models.DB.First(&user, claims["user_id"]).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error while retrieving the user": err.Error()})
		return
	}

	// Attatch the user to the request
	c.Set("user", user)
	// If JWT is valid, proceed to the next middleware or handler
	c.Next()
}
