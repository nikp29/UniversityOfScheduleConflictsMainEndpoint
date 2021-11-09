import admin from "./config.js";

export const checkIfAuthenticated = async (req, res, next) => {
    // console.log("Checking authentication");
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        req.authToken = req.headers.authorization.split(" ")[1];
    } else {
        req.authToken = null;
    }
    try {
        const { authToken } = req;
        const userInfo = await admin.auth().verifyIdToken(authToken);
        req.email = userInfo.email;
        req.id = userInfo.uid;
        return next();
    } catch (e) {
        return res
            .status(401)
            .send({ error: "You are not authorized to make this request" });
    }
};
