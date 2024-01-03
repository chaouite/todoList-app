package controllers

import (
	"fmt"
	"net/http"
	"os"
	"time"
	"todoList-app/models"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hashedPassword), err
}

func SignUp(c *gin.Context) {
	fmt.Println("Handling SignUp request")
	var userToSignUp models.SignUpInput

	if err := c.ShouldBindJSON(&userToSignUp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error while binding": err.Error()})
		return
	}

	// Hash the password with bcrypt
	hashedPassword, err := hashPassword(userToSignUp.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Failed to hash the password": err.Error()})
		return
	}

	// Create the user
	user := models.User{Username: userToSignUp.Username, Password: string(hashedPassword)}
	result := models.DB.Create(&user)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Failed to create user": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"created user": user})

}
func Login(c *gin.Context) {
	// Get user data from JSON and bind it to @userToBeLoggedIn
	var userToBeLoggedIn models.SignUpInput
	if err := c.ShouldBindJSON(&userToBeLoggedIn); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error while binding": err.Error()})
		return
	}

	// Check the user existance in DB - We used only the username because it's unique
	var user models.User
	// If username is wrong
	if err := models.DB.Where("username=?", userToBeLoggedIn.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Invalid username ": err.Error()})
		return
	}
	// If username is correct => check the password
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userToBeLoggedIn.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Invalid password": err.Error()})
		return
	}

	// Create the standard MapClaims
	claims := jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 1).Unix(), // Token expires in 1 hour
	}
	// Generate JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Use the secret key to sign the token
	secretKey := []byte(os.Getenv("SECRET"))
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Failed to create the token": err.Error()})
		return
	}

	// Set the token as a cookie
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Auth", tokenString, 3600, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{"token": tokenString})

}
func Validate(c *gin.Context) {
	user, _ := c.Get("user")

	c.JSON(http.StatusOK, gin.H{"user that is logged in": user})
}
func GetUser(c *gin.Context) {
	var userToBeFound models.User
	if err := models.DB.Where("id=?", c.Param("userId")).First(&userToBeFound).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error while retrieving the user": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"user": userToBeFound})
}
func GetUsers(c *gin.Context) {
	var users []models.User

	models.DB.Find(&users)

	c.JSON(http.StatusOK, gin.H{"all users": users})
}
