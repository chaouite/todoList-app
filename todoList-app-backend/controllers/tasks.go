package controllers

import (
	"net/http"
	"todoList-app/models"

	"github.com/gin-gonic/gin"
)

/*------------------GET------------------------*/

/*****User protected*****/
// GET - Get all tasks of a specific user
func GetAllTasks(c *gin.Context) {

	var tasks []models.Task

	// find all tasks of a creator/user and put them in @tasks
	models.DB.Where("creator = ?", c.Param("creator")).Find(&tasks)

	c.JSON(http.StatusOK, gin.H{"all tasks": tasks})
}

// GET - Get all a user's tasks of a category of a user
func GetTasksByCategory(c *gin.Context) {
	var tasks []models.Task

	if err := models.DB.Where(
		"category = ? AND creator = ?",
		c.Param("category"), c.Param("creator")).Find(&tasks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "while retrieving"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"category tasks": tasks})
}

/*****NOT user protected*****/
// GET - Get all tasks - TODO: delete it later
func GetAllTasksForBackend(c *gin.Context) {

	var tasks []models.Task
	// find all tasks and put them in @tasks
	models.DB.Find(&tasks)

	c.JSON(http.StatusOK, gin.H{"all tasks": tasks})
}

// GET - Get a task by ID
func GetTaskByID(c *gin.Context) {
	var taskToBefound models.Task

	// Get a task based on the ID retrieved from URL parameters + check for error while retrieving
	if err := models.DB.Where("id=?", c.Param("id")).First(&taskToBefound).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "while retrieving"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"task": taskToBefound})
}

// GET - Get Id of a task
func GetTaskID(c *gin.Context) {
	var taskToBefound models.Task

	// Get a task based on the ID retrieved from URL parameters + check for error while retrieving
	if err := models.DB.Where(
		"title=?", c.Param("title"),
		"text=?", c.Param("text"),
		"category=?", c.Param("category")).First(&taskToBefound).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "while retrieving"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"id": taskToBefound.ID})
}

/*------------------POST------------------------*/
// POST - Add new task
func AddNewTask(c *gin.Context) {

	var taskToBeAdded models.NewTaskInput

	// Bind req body to @taskToBeAdded (Verify the input) + check for error in binding
	if err := c.ShouldBindJSON(&taskToBeAdded); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "while binding"})
		return
	}

	// task to be added
	task := models.Task{
		Title:     taskToBeAdded.Title,
		Text:      taskToBeAdded.Text,
		Category:  taskToBeAdded.Category,
		TaskOrder: taskToBeAdded.TaskOrder,
		Done:      false,
		Creator:   taskToBeAdded.Creator}
	models.DB.Create(&task)

	c.JSON(http.StatusOK, gin.H{"created task": task})

}

/*------------------DELETE------------------------*/
// DELETE - Delete a task
func DeteleTask(c *gin.Context) {
	var taskToBeDeleted models.Task
	// Get a task based on the ID retrieved from URL parameters + check for error while retrieving
	if err := models.DB.Where("id=?", c.Param("id")).First(&taskToBeDeleted).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "while retrieving"})
		return
	}

	models.DB.Delete(&taskToBeDeleted)

	// Fetch all tasks again
	var tasks []models.Task
	models.DB.Where("creator = ?", taskToBeDeleted.Creator).Find(&tasks)
	// Update the orders based on the task's placement
	for i := 0; i < len(tasks); i++ {
		models.DB.Model(&tasks[i]).Update("TaskOrder", i+1)
	}

	c.JSON(http.StatusOK, gin.H{"new tasks": tasks})
}

/*------------------PATCH------------------------*/
// PATCH - Update a task - Change category
func UpdateTask(c *gin.Context) {

	var taskToBeUpdated models.Task
	var taskUpdateInput models.UpdateTaskInput

	// Get a task based on the ID retrieved from URL parameters + check for error while retrieving
	if err := models.DB.Where("id=?", c.Param("id")).First(&taskToBeUpdated).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "while retrieving"})
		return
	}

	// Validate the input + check for error in binding
	if err := c.ShouldBindJSON(&taskUpdateInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error ": "while binding"})
		return
	}

	models.DB.Model(&taskToBeUpdated).Updates(taskUpdateInput)
	c.JSON(http.StatusOK, gin.H{"updated task": taskToBeUpdated})

}

// PATCH - Complete/Uncomplete a task
func CompleteUncompeleTask(c *gin.Context) {

	var taskToBeCompleted models.Task

	// Get the task
	if err := models.DB.Where("id=?", c.Param("id")).First(&taskToBeCompleted).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error ": "while retrieving"})
		return
	}

	models.DB.Model(&taskToBeCompleted).Update("done", !taskToBeCompleted.Done)
	c.JSON(http.StatusOK, gin.H{"completed task": taskToBeCompleted})

}

/*------------------ORDER OF TASK------------------------*/
// GET - Get the next order for created Task
func GetNextOrder(c *gin.Context) {
	var tasks []models.Task

	// find all tasks of a creator/user and put them in @tasks
	models.DB.Where("creator = ?", c.Param("creator")).Find(&tasks)
	c.JSON(http.StatusOK, gin.H{"next order": len(tasks) + 1}) // length because the order changed if we delete TODO

}

// GET - swap
func GetTasksAfterSwap(c *gin.Context) {
	// Get tasks we wanna swap
	var firstTask models.Task
	var secondTask models.Task

	if err := models.DB.Where("task_order = ?",
		c.Param("orderFirst")).First(&firstTask).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "while retrieving first task", "details": err.Error()})
		return
	}
	if err := models.DB.Where("task_order = ?",
		c.Param("orderSecond")).First(&secondTask).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "while retrieving second task"})
		return
	}

	// Swap
	firstTask.TaskOrder, secondTask.TaskOrder = secondTask.TaskOrder, firstTask.TaskOrder

	// Change the places
	// Update tasks in the database
	if err := models.DB.Save(&firstTask).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "while updating first task", "details": err.Error()})
		return
	}

	if err := models.DB.Save(&secondTask).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "while updating second task", "details": err.Error()})
		return
	}

	// Retrieve all tasks after the swap
	var tasks []models.Task
	models.DB.Where("creator = ?", firstTask.Creator).Order("task_order").Find(&tasks)

	// Reorder the tasks based on the updated TaskOrder values
	for i := 0; i < len(tasks); i++ {
		models.DB.Model(&tasks[i]).Update("TaskOrder", i+1)
	}
	c.JSON(http.StatusOK, gin.H{"tasks": tasks})

}
