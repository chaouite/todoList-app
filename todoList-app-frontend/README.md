# ToDo List Applciation - Fontend

## Table of Contents

- [Getting Started](#getting-started)
- [Main Components](#main-components)


## Getting Started
1. **Install Node.js:**
   - Download and install Node.js from [nodejs.org](https://nodejs.org/).

2. **Clone the Repository:**
   ```bash
   git clone https://github.com/chaouite/todoList-app/tree/main/todoList-app-frontend
   ```

3. **Install Dependencies**
   ```bash
    npm install
    ```
4. **Run the Frontend:**
   ```bash
    npm run dev
    ```

This command will start the development server. Open the browser and visit http://localhost:5173/.

## Main Components
`<App/>` is where the routing is done. It includes 4 routes:

- `<MainApp/>` accessed through `/`: This page is where all the magic happens. It cannot be accessed unless the user is already logged in; otherwise, they will be directly redirected to `<WelcomePage/>`.

- `<WelcomePage />` accessed through `/welcome`
- `<Login />` accessed through `/login`
- `<Signup />` accessed through `/signup`

`<Signup />` is a simple form that gets the user input and sends a request to the backend to register the current user in our users DB. It provides an option to go back to `/welcome`.

- POST: http://localhost:8080/signup
- Body:
	```json
	{
   	 "username": "",
    	"password": ""
	}
	```
Checks if the user is already created or not; the username should be unique to each user. Otherwise, the user will be redirected to the /login page.

`<Login />` is a simple form that sends a request to the backend to log in. It provides an option to go back to `/welcome`.

- POST: http://localhost:8080/login
- Body:
	```json
	{
   	 "username": "",
    	"password": ""
	}
	```
It sends a request to the backend to log in and checks the validity of the user data.  If successful redirect to ‘/‘ (<MainApp/>)

`<MainApp/>` is accessed through /: this is where all the magic happens. This page cannot be accessed unless the user is already logged in; otherwise, they will be redirected to <WelcomePage/>.
It includes all of the following components:
   - `<MainHeader/>`: Displays the username, allows the user to logout (sends a request to http://localhost:8080/logout), shows the app name, and provides the option to add a new task (Add button).
   - `<NewTask/>`: Handles the form when the user tries to add a new task (empty form). In this case, the order of the new task is fetched by sending an HTTP request to http://localhost:8080/nextorder/:username. Also, it handles updating when the user wants to edit an existing task (form filled with the data of the task to be updated).
   - `<CategoryFilter/>`: A radio button that gives the user the possibility to filter tasks based on their categories.
   - `<Swap/>`: Shown only when tasks of all categories are displayed, allowing the user to switch the positions/order of two tasks.
   - `<Tasks/>`: Responsible for rendering tasks of a specific user/creator, giving the user the ability to see information about each task (title, text, category, order), update a task's data, and delete a task.

This component (`<MainApp/>`) is responsible for most HTTP requests and logic in the app:
   - Validates the username and password after the user attempts to log in, returning the username (http://localhost:8080/validate).
   - Blocks access to '/' unless the user is logged in.
   - Handles the logic of adding a new Task: ***POST*** to http://localhost:8080/tasks/:username.
   - Handles the request for deleting a task: ***DELETE*** to http://localhost:8080/delete/:taskId, changing the order of the remaining tasks if successful.
   - Handles the request to mark a task as completed: ***POST*** to  http://localhost:8080/complete/:taskId.
   - Handles the request to render tasks of a specific category: ***GET*** to  http://localhost:8080/findall/:category/:username.
   - Handles the request to update a task's data: ***POST*** to http://localhost:8080/update/:taskId.
   - Handles the request to swap two tasks: ***GET*** to http://localhost:8080/swap/:orderOfFirstTask/:orderOfSecondTask, obtaining the new tasks array with the new order after the swap.
