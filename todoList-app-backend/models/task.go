package models

type Task struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Text      string `json:"text"`
	Category  string `json:"category"`
	TaskOrder int    `json:"taskOrder"`
	Done      bool   `json:"done"`
	Creator   string `json:"creator"`
}

// New task from JSON body (the input)
type NewTaskInput struct {
	Title     string `json:"title" binding:"required"`
	Text      string `json:"text" binding:"required"`
	Category  string `json:"category" binding:"required"`
	TaskOrder int    `json:"taskOrder" binding:"required"`
	Creator   string `json:"creator" binding:"required"`
}

// Update task / like @NewTaskInput but here fields are not required
type UpdateTaskInput struct {
	Title    string `json:"title"`
	Text     string `json:"text"`
	Category string `json:"category"`
	Creator  string `json:"creator"`
}
