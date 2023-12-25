package controllers

import (
	"net/http"
	"todoList-app/models"

	"github.com/gin-gonic/gin"
)

// GET - Get all tasks
func GetAllTasks(c *gin.Context) {

	var tasks []models.Task
	// find all tasks and put them in @tasks
	models.DB.Find(&tasks)

	c.JSON(http.StatusOK, gin.H{"all tasks": tasks})
}

// POST - Add new task
func AddNewTask(c *gin.Context) {

	var taskToBeAdded models.NewTaskInput

	// Bind req body to @taskToBeAdded (Verify the input) + check for error in binding
	if err := c.ShouldBindJSON(&taskToBeAdded); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error while binding": err.Error()})
		return
	}

	// task to be added
	task := models.Task{Title: taskToBeAdded.Title, Text: taskToBeAdded.Text, Category: taskToBeAdded.Category, Order: taskToBeAdded.Order, Done: false}
	models.DB.Create(&task)

	c.JSON(http.StatusOK, gin.H{"created task": task})

}

// GET - Get a task
func GetTask(c *gin.Context) {
	var taskToBefound models.Task

	// Get a task based on the ID retrieved from URL parameters + check for error while retrieving
	if err := models.DB.Where("id=?", c.Param("id")).First(&taskToBefound).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error while retrieving": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"task": taskToBefound})
}

// DELETE - Delete a task
func DeteleTask(c *gin.Context) {
	var taskToBeDeleted models.Task
	// Get a task based on the ID retrieved from URL parameters + check for error while retrieving
	if err := models.DB.Where("id=?", c.Param("id")).First(&taskToBeDeleted).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error while retrieving": err.Error()})
		return
	}

	models.DB.Delete(&taskToBeDeleted)

	c.JSON(http.StatusOK, gin.H{"deleted Task": taskToBeDeleted})
}

// PATCH - Update a task - Change category - Change order
func UpdateTask(c *gin.Context) {

	var taskToBeUpdated models.Task
	var taskUpdateInput models.UpdateTaskInput

	// Get a task based on the ID retrieved from URL parameters + check for error while retrieving
	if err := models.DB.Where("id=?", c.Param("id")).First(&taskToBeUpdated).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error while retrieving": err.Error()})
		return
	}

	// Validate the input + check for error in binding
	if err := c.ShouldBindJSON(&taskUpdateInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error while binding": err.Error()})
		return
	}

	models.DB.Model(&taskToBeUpdated).Updates(taskUpdateInput)
	c.JSON(http.StatusOK, gin.H{"updated task": taskToBeUpdated})

}

// PATCH - Complete a task
func CompleteTask(c *gin.Context) {

	var taskToBeCompleted models.Task

	// Get the task
	if err := models.DB.Where("id=?", c.Param("id")).First(&taskToBeCompleted).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error while retrieving": err.Error()})
		return
	}

	models.DB.Model(&taskToBeCompleted).Update("done", true)
	c.JSON(http.StatusOK, gin.H{"completed task": taskToBeCompleted})

}
