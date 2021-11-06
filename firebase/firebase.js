import * as admin from "firebase-admin";

var serviceAccount = require("account_credential.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
