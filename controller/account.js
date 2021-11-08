import admin from "../firebase/config.js";

const createAccount = async (req, res) => {
    const email = req.email;
    const usersRef = admin.firestore().collection("users");
    let document = await usersRef.doc(email);
    if (!document.get()) {
        await document.set(
            {
                email,
                schedule: new Array(24 * 4 * 7).fill(0),
            },
            { merge: true }
        );
        res.status(200).json({
            message: "success",
        });
        return;
    }
    res.status(400).json({
        message: "account already exists",
    });
};

export { createAccount };
