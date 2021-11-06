import admin from "./config.js";

export const checkIfAuthenticated = async (req, res, next) => {
    try {
        const { authToken } = req.body;
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
