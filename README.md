# UniversityOfScheduleConflictsMainEndpoint
## Setup
* Get .env file from Nikhil
* `npm install`
* `npm run dev`

## Testing

To generate new firebase token:
```
curl 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]' \
-H 'Content-Type: application/json' \
--data-binary '{"email":"urmom@gmail.com","password":"welcome123","returnSecureToken":true}'
```

## Deploy current head
`heroku git:remote -a uofschedulingconflictsapi`
`git push heroku HEAD:master`