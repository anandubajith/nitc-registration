
User
- POST /user/login
- POST /user/register

Due
- GET /due <-  return the currently authenticated students due
- GET /due/list <- list all the dues ( if role = ACADEMIC)
- POST /due/create <-  create a due entry
- POST /due/update <- update a due entry


Application
- GET /application <-  get current students application
- POST /application <- update the current students application
- GET /application/list <- let academic list all, let FA list his
- POST /application/status/update <-  update or reject the application