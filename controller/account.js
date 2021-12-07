import admin from "../firebase/config.js";

const createAccount = async (req, res) => {
    console.log("createAccount");
    res.header("Access-Control-Allow-Origin", "*");
    const email = req.email;
    const usersRef = admin.firestore().collection("users");
    let documentRef = await usersRef.doc(email);
    let document = await documentRef.get();
    if (!document || !document.exists) {
        await documentRef.set(
            {
                email,
                schedule: new Array(13 * 7).fill(0),
            },
            { merge: true }
        );
        res.status(200)
            .json({
                message: "success",
            })
            .catch((error) => {
                res.status(500).json({
                    error: error.message,
                });
            });
        return;
    }
    res.status(409).json({
        error: "account already exists",
    });
};

export { createAccount };
