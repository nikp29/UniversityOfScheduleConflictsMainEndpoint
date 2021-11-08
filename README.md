# UniversityOfScheduleConflictsMainEndpoint
## Setup
* Get credentials from Nikhil
* `export GOOGLE_APPLICATION_CREDENTIALS="/Users/<user>/Documents/Programming/UniversityOfScheduleConflictsMainEndpoint/firebase/account_credential.json"`
* `npm install`
* `node server.js`

## Testing

To generate new firebase token use
curl 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]' \
-H 'Content-Type: application/json' \
--data-binary '{"email":"urmom@gmail.com","password":"welcome123","returnSecureToken":true}'
