package main

import (
	"todoList-app/controllers"
	"todoList-app/middleware"
	"todoList-app/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Add CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"} // Frontend port
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "PATCH"}
	router.Use(cors.New(config))

	models.ConnectDatabase()

	// GET - Get all tasks
	router.GET("/tasks", controllers.GetAllTasks)

	// POST - Add new task
	router.POST("/add", controllers.AddNewTask)

	// GET - find a task by Id
	router.GET("/:id", controllers.GetTaskByID)

	// GET - find Id of a task
	router.GET("/find/:title/:text/:category", controllers.GetTaskID)

	// GET - find all tasks by category
	router.GET("/findall/:category", controllers.GetTasksByCategory)

	// DELETE - Delete a task
	router.DELETE("/delete/:id", controllers.DeteleTask)

	// PATCH - Update a task - Change category
	router.PATCH("/update/:id", controllers.UpdateTask)

	// PATCH - Complete/Uncomplete a task
	router.PATCH("/complete/:id", controllers.CompleteUncompeleTask)

	// POST - register a new User => Sign up
	router.POST("/signup", controllers.SignUp)

	// POST - Login
	router.POST("/login", controllers.Login)

	// GET - Get all users
	router.GET("/users", controllers.GetUsers)

	// GET - Get a user based on its ID
	router.GET("/user/:userId", controllers.GetUser)

	// GET - Validate the request
	router.GET("/validate", middleware.CheckJWTMiddleware, controllers.Validate)

	router.Run(":8080")

}
