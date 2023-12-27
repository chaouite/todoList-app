package main

import (
	"todoList-app/controllers"
	"todoList-app/models"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

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
