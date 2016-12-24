accountability app

#API

##Users
* GET /users/userlist
  * Retrieves a list of all users
* POST /users/login/:email/:password
  * Does a login check to determine if password and email were correct. returns user or x if incorrect.
*  POST /users/addUser
  * Creates a new user defined by the body sent according to the following format:
    {"username":"your_username","email":"your@email.com","password":"password","fullname":"fullname"}
*  DELETE /users/:id
  * Deletes the specified user
*  GET /users/getUser/:email
  * Returns the specified user according to email

##Goals
*  GET /goals/goals
  * Returns a list of all goals.
*  GET /goals/findusergoals
  * Returns a list of all goals (redundant, I know)
*  GET /goals/findusergoals/:user
  * Returns the goals of the specified user
*  GET /goals/findbuddygoals/:buddy
  * Returns all goals user is a buddy of
* GET /goals/findgoal/:user/:goal
  * Returns all steps (goal objects) of a specific goal of a specified user
* POST /goals/addstep
  * Must include password as 2nd item in JSON object array to function. Adds a step according to the following format:
    [{user: "user", goal: "goal", step: "step", description: "description"}, {password: "password"}]
* DELETE goals/deletestep/:id
  * Deletes a step by the id
