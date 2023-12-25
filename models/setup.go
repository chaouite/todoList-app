package models

// Setup the DB
import (
	"gorm.io/driver/sqlite"

	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// Connect to a SQLite database
	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})

	// Check for errors during database connection
	if err != nil {
		panic("Failed to connect to database!")
	}

	// AutoMigrate will create the table if it doesn't exist
	err = database.AutoMigrate(&Task{})
	if err != nil {
		return
	}

	// Assign the connected database to the global variable DB
	DB = database
}
