import admin from "../firebase/config.js";

const createAccount = async (req, res) => {
    const email = req.email;
    let schedule = new Array(7);

    for (var i = 0; i < schedule.length; i++) {
        schedule[i] = new Array(13 * 4).fill(0);
    }
    const usersRef = admin.firestore().collection("users");
    let documentRef = await usersRef.doc(email);
    let document = await documentRef.get();
    if (!document || !document.exists) {
        await documentRef.set(
            {
                email,
                schedule,
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
