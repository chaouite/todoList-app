

# ToDo List Applciation

The **ToDo List Applciation** is a RESTful API developed using Go and the Gin framework. It provides a set of endpoints for seamless CRUD operations on tasks, allowing users to efficiently manage their to-do lists. In addition to these core functionalities, the application also incorporates various unique [Features](#features) that enhance the user experience and provide additional value. 

## Table of Contents

- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [API Endpoints](#api-endpoints)

## Getting Started

1. **Install Go**

   ```shell
   go get github.com/gin-gonic/gin

2. **Clone the repository**

   ```shell
   git clone https://github.com/chaouite/todoList-app.git
   
3. **Navigate to the Project Directory**

   ```shell
   cd todoList-app

4. **Install Dependencies**

    ```shell
    go mod download

5. **Run the Application**

    ```shell
    air
   
6. **Accessing the Application**
The application should now be running locally at http://localhost:8080.   

## Technologies Used

- [Gin](https://github.com/gin-gonic/gin): A lightweight and fast web framework for Go, used for defining routes, handling HTTP requests, and building APIs.

- [Gorm](https://gorm.io/): A powerful and flexible Object Relational Mapper (ORM) for Go, used for interacting with the SQLite database.

- [Air](https://github.com/cosmtrek/air): A live-reloading tool for Go applications, simplifying the development workflow by automatically restarting the application upon code changes.


## API Endpoints

- **GET /tasks:** Retrieve all tasks.

- **POST /add:** Add a new task.

- **GET /:id:** Find a task by its ID.

- **DELETE /delete/:id:** Delete a task by its ID.

- **PATCH /update/:id:** Update a task. This endpoint can be used to change the category or order of a task.

- **PATCH /complete/:id:** Complete a task. Marks a task as completed.


## JSON To test
{
  "title": "Read Book",
  "text": "Finish the novel you started last week.",
  "category": "Personal",
  "order": 2
}

{
  "title": "Complete Assignment",
  "text": "Finish the project before the deadline.",
  "category": "Work",
  "order": 1
}

