
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import firebase from 'firebase';
import client from 'twilio';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig)
const app = express();

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const corsOptions = {
    origin: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Methods', 'Access-Control-Request-Headers', 'authToken', 'refreshToken'],
};

app.use(cors(corsOptions));


app.post("/sendMessage", async (req: Request, res: Response) => {
    const { message, phoneNumber, name } = req.body
    if (typeof message !== "number" || message > 999999 || message < 100000)
        res.status(400).json({ error: true, message: "Message should be string", status: 400 })
    else if (typeof phoneNumber !== "string" || phoneNumber.length !== 10)
        res.status(400).json({ error: true, message: "Invalid phone number", status: 400 })
    else {
        try {
            console.log("inside try", message, phoneNumber)
            const twilioClient = client("AC5ac0bf7a54c36d33dd95b62fe7090289", "64ba1f4a1a6db2afdb30da6985568a09")
            const result = await twilioClient.messages.create({ body: `Hi. your otp is ${message}`, messagingServiceSid: 'MG7fdf86bd7704f8122cbf70885b57f05d', to: `+91${phoneNumber}` })
            await firebase.firestore().collection('messages').add({ otp: message, name: name, time: new Date().toDateString() })
            res.status(200).json({ error: false, message: "message sent successfully", data: result, status: 200 })
        }
        catch (e) {
            res.status(500).json({ error: true, message: "failed to send message", data: e, status: 500 })
        }
    }

})

app.get("/message", async (req: Request, res: Response) => {
    try {
        console.log("fndnfdj")
        const data = await firebase.firestore().collection('messages').orderBy('time', 'desc').get()
        const dataToSend = data.docs.map((doc)=>{
            return doc.data()
        })
        res.status(200).json({error: false, data: dataToSend, status: 200})
    }
    catch (e) {
        res.status(500).json({error: false, message: "Failed to get messages", status: 500})
    }
})


const port = 5000
app.listen(port, () => { console.log("Server runniing") })