import admin from "../firebase/config.js";

const createAccount = async (req, res) => {
    const email = req.email;
    const usersRef = admin.firestore().collection("users");
    let document = await firebase
        .firestore()
        .collection("users")
        .doc(email)
        .get();
    if (!document) {
        await document.ref.set(
            {
                email,
                schedule: new Array(24 * 4 * 7).fill(0),
            },
            { merge: true }
        );
    }
};

export { createAccount };
