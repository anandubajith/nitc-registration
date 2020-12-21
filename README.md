
User
- POST /user/login                     ✅
    takes {username, password } and logs in
- POST /user/register
    temporary endpoint

Due
- GET /due                              ✅
    if user return his library+hostel dues
    if library admin return all library dues
    if hostel admin return all hostel dues
    else throw error
- POST /due                             ✅
    if library admin create due of type library
    if hostel admin create due of type hostel
    else throw error

Application
- GET /application                      ✅
    if user return the currently saved details
    else throw error

- PATCH /application                    ✅     
    if StudentIsOwner apply updates
    else throw error

- PUT /application/status
    if SAC|Faculty|Academic set remark, update application status, set in verificationEntity
    else throw error

- GET /application/list                 ✅
    if SAC|Faculty|Academic return them by filtering