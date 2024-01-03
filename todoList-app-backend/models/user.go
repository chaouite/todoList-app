package models

import "gorm.io/gorm"

type User struct {
	gorm.Model        // Adds ID CreatedAt UpdatedAt DeletedAt
	Username   string `json:"username" validate:"required, min=5, max=10" gorm:"unique"`
	Password   string `json:"password"`
}

type SignUpInput struct {
	Username string `json:"username" validate:"required, min=5, max=10" gorm:"unique" binding:"required"`
	Password string `json:"password" binding:"required"`
}
