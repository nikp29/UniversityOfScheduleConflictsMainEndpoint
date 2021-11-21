import admin from "../firebase/config.js";

const getSchedule = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({
            message: "Email not provided",
        });
        return;
    }
    const usersRef = admin.firestore().collection("users");
    usersRef
        .doc(email)
        .get()
        .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
                res.status(404).json({
                    data: "User does not exist",
                });
                return;
            }
            const data = firestoreDocument.data();
            res.status(200).json({
                schedule: data.schedule,
            });
        })
        .catch((error) => {
            res.status(400).json({
                data: error.message,
            });
        });
};

const getSchedules = async (req, res) => {
    const { emailList } = req.body;
    const usersRef = admin.firestore().collection("users");
    var scheduleList = [];
    for (let i = 0; i < emailList.length; i++) {
        await usersRef
            .doc(emailList[i])
            .get()
            .then((firestoreDocument) => {
                if (firestoreDocument.exists) {
                    const data = firestoreDocument.data();

                    scheduleList.push(data.schedule);
                    console.log(scheduleList);
                }
            })
            .catch((error) => {
                res.status(500).json({
                    data: error.message,
                });
            });
    }
    res.status(200).json({
        scheduleList: scheduleList,
    });
};

const updateSchedule = async (req, res) => {
    const email = req.email;
    const { schedule } = req.body;
    const usersRef = admin.firestore().collection("users");
    await usersRef
        .doc(email)
        .update({
            schedule: schedule,
        })
        .catch((error) => {
            res.status(500).json({
                data: error.message,
            });
        });
    if (schedule.length === 672) {
        res.status(200).json({
            schedule: schedule,
        });
    } else {
        res.status(411).json({
            data: "schedule array must be 672 time slots long",
        });
    }
};

export { getSchedule, getSchedules, updateSchedule };
