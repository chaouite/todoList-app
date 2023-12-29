package main

import (
	"todoList-app/controllers"
	"todoList-app/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Add CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"} // Update with your React app's origin
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	router.Use(cors.New(config))

	models.ConnectDatabase()

	// GET - Get all tasks
	router.GET("/tasks", controllers.GetAllTasks)

	// POST - Add new task
	router.POST("/add", controllers.AddNewTask)

	// GET - find a task
	router.GET("/:id", controllers.GetTask)

	// DELETE - Delete a task
	router.DELETE("/delete/:id", controllers.DeteleTask)

	// PATCH - Update a task - Change category - Change order
	router.PATCH("/update/:id", controllers.UpdateTask)

	// PATCH - Complete a task
	router.PATCH("/complete/:id", controllers.CompleteTask)

	router.Run(":8080")

}
