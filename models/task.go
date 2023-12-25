package models

type Task struct {
	ID       int    `json:"id"`
	Title    string `json:"title"`
	Text     string `json:"text"`
	Category string `json:"category"`
	Order    int    `json:"order"`
	Done     bool   `json:"done"`
}

// New task from JSON body (the input)
type NewTaskInput struct {
	Title    string `json:"title" binding:"required"`
	Text     string `json:"text" binding:"required"`
	Category string `json:"category" binding:"required"`
	Order    int    `json:"order" binding:"required"`
}

// Update task / like @NewTaskInput but here fields are not required
type UpdateTaskInput struct {
	Title    string `json:"title"`
	Text     string `json:"text"`
	Category string `json:"category"`
	Order    int    `json:"order"`
}
