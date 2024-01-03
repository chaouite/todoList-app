package models

// Setup the DB and connect to it
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

	// Connect to a table
	err = database.AutoMigrate(&Task{}) // AutoMigrate will create the table if it doesn't exist
	if err != nil {
		return
	}

	err = database.AutoMigrate(&User{})
	if err != nil {
		return
	}

	// Assign the connected database to the global variable DB
	DB = database
}
