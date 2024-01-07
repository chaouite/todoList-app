# ToDo List Applciation - Backend

## Table of Contents

- [Getting Started](#getting-started)
- [Issues With Air](#issues-with-air)
- [Technologies Used](#technologies-used)
- [Main Files](#main-files)

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

## Issues With Air
When sharing code through Git, note that Git doesn't include machine-specific environment variables or local settings. Critical settings like PATH, GOPATH, and GOBIN in a Go development environment aren't automatically transferred. So configure them properly:

```shell
# Set up the Go development environment and configure 'air'
export GOPATH=$HOME/go
source ~/.bash_profile
export GOBIN=$GOPATH/bin
source ~/.bash_profile
```
```shell
# Install 'air' using go get
go get -u github.com/cosmtrek/air
```
```shell
# Update PATH to include the Go binaries directory
export PATH=$PATH:$HOME/go/bin
source ~/.bash_profile
```
```shell
# Start the development server with 'air'
air
```

## Technologies Used

- [Gin](https://github.com/gin-gonic/gin)
- [Gorm](https://gorm.io/)
- [Air](https://github.com/cosmtrek/air)
- [JWT](github.com/golang-jwt/jwt)
- [bcrypt](https://pkg.go.dev/golang.org/x/crypto/bcrypt)


## Main Files

- **main.go**: enables the CORS middleware, allows methods and credentials, and performs other configurations. It connects to the database, configures the HTTP endpoints and defines functions to handle requests 
- **task.go**: includes Task Struct
  - TaskOrder represents the task's order in the todo list.
  - Creator is the user who created the task.
  - Done is a boolean value indicating whether the task is completed or not.
```go
type Task struct {
    ID        int    `json:"id"`
    Title     string `json:"title"`
    Text      string `json:"text"`
    Category  string `json:"category"`
    TaskOrder int    `json:"taskOrder"`
    Done      bool   `json:"done"`
    Creator   string `json:"creator"`
}
```

- **user.go**: includes User Struct
  - gorm.model adds: ID, CreatedAt, UpdatedAt, DeletedAt.
```go
type User struct {
    gorm.Model       
    Username   string `json:"username" validate:"required, min=5, max=10" gorm:"unique"`
    Password   string `json:"password"`
}
```
- **setup.go**: Sets up the SQLite database and provides a function to connect to it.

- **tasks.go**: Contains functions that handle requests to manage the Task struct:
   - ***GetAllTasks***: GET - Get all tasks of a specific user 
      ```http
      /tasks/:creator
      ```

   - ***GetTasksByCategory***:</u> GET - Get all a user's tasks of a category
     ```http
     /findall/:category/:creator
     ```

   - ***GetAllTasksForBackend***:</u> GET - Get all tasks, for testing purposes => /tasks.
   - ***GetTaskByID***: GET - Get a task by ID
     ```http
     /:id
     ```

   - ***AddNewTask:*** POST - Add a new task 
      ```http
      /add
      ```

   - ***DeleteTask:*** DELETE - Delete a task and reset the order of the remaining tasks based on their index
     ```http
     /delete/:id
     ```

   - ***UpdateTask:*** PATCH - Update a task's data
     ```http
     /update/:id
     ```

   - ***CompleteUncompeleTask:*** PATCH - Mark a task as completed or uncompleted
      ```http
      /complete/:id
      ```

   - ***GetNextOrder:*** GET - Get the next order for a Task to be created next
      ```http
      /nextorder/:creator
      ```

   - ***GetTasksAfterSwap:*** GET - Get the tasks in the new order after the swapping
      ```http
      /swap/:orderFirst/:orderSecond
      ```

- **users.go**: Includes functions collectively providing functionality for user registration, login, logout, validation, and user data retrieval and deletion.
   - ***hashPassword:*** Uses bcrypt to hash the password and returns the hashed password as a string.

   - ***SignUp:*** POST - Handles the sign-up request, hashes the password and creates a new user in the database
      ```http
      /signup
      ```

   - ***Login:*** POST - Manages user login functionality, validates the username, checks the password and issues a JWT token on successful login. Sets the JWT token as a cookie in the response
      ```http
      /login
      ```

   - ***Logout:*** POST - Deletes the authentication cookie to log the user out by setting the max age to a negative value
      ```http
      /logout
      ```

   - ***Validate:*** GET - This function validates user information by retrieving data stored in the context. Before execution, the CheckJWTMiddleware, a middleware function, is invoked. This middleware examines the incoming request, checks for the presence of a cookie in the HTTP request, parses and validates the token, and verifies its expiration date. Subsequently, the middleware attaches the user to the request, enabling the program to execute the Validate function effectively.
      ```http
      /validate
      ```

   - ***GetUser:*** GET - Gets a user by their ID from the database
      ```http
      /user/:userId
      ```

   - ***GetUsers:*** GET - Gets all users from the database
      ```http
      /users
      ```

   - ***DeleteUser:*** DELETE - Deletes a user by their ID from the database
      ```http
      /delete/user/:id
      ```


