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
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	config.ExposeHeaders = []string{"Content-Length"}
	config.AllowCredentials = true
	router.Use(cors.New(config))

	models.ConnectDatabase()

	/******************Task*****************/
	// GET - Get all tasks for one creator
	router.GET("/tasks/:creator", controllers.GetAllTasks)

	// GET - Get all tasks -  TODO: delete lated
	router.GET("/tasks", controllers.GetAllTasksForBackend)

	// POST - Add new task
	router.POST("/add", controllers.AddNewTask)

	// GET - find a task by Id
	router.GET("/:id", controllers.GetTaskByID)

	// GET - find Id of a task
	router.GET("/find/:title/:text/:category", controllers.GetTaskID)

	// GET - find all tasks of a user by category
	router.GET("/findall/:category/:creator", controllers.GetTasksByCategory)

	// DELETE - Delete a task
	router.DELETE("/delete/:id", controllers.DeteleTask)

	// PATCH - Update a task - Change category
	router.PATCH("/update/:id", controllers.UpdateTask)

	// PATCH - Complete/Uncomplete a task
	router.PATCH("/complete/:id", controllers.CompleteUncompeleTask)

	// GET - Get biggest order
	router.GET("/nextorder/:creator", controllers.GetNextOrder)

	// GET - Swap
	router.GET("/swap/:orderFirst/:orderSecond", controllers.GetTasksAfterSwap)

	/******************User*****************/
	// POST - register a new User => Sign up
	router.POST("/signup", controllers.SignUp)

	// POST - Login
	router.POST("/login", controllers.Login)

	// POST - Logout
	router.POST("/logout", controllers.Logout)

	// GET - Get all users
	router.GET("/users", controllers.GetUsers)

	// GET - Get a user based on its ID
	router.GET("/user/:userId", controllers.GetUser)

	// GET - Validate the request
	router.GET("/validate", middleware.CheckJWTMiddleware, controllers.Validate)

	// DELETE - Delete a user
	router.DELETE("/delete/user/:id", controllers.DeleteUser)

	router.Run(":8080")

}
