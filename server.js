const express = require("express");
const cors = require("cors");

const accountSid = "ACa20a44a05c166c7d722d91930a46a7d2";
const authToken = "09a293a5c0c3e76f89b77ab9b92b4aaa";
const client = require("twilio")(accountSid, authToken);

const app = express();

app.use(express.json());
app.use(cors());

const sendSMS = async (body) => {
    let msgOptions = {
        from: "+16893198715",
        to: "+916305020068",
        body
    };
    try {
        const message = await client.messages.create(msgOptions);
        console.log(message);
    } catch (err) {
        console.log(err);
    }
};

app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;
    console.log(req.body);
    const messageTemplate = `\n
This is to inform you that you have received a new message.

Details:

* Sender: ${name}
* Email Address: ${email}
* Message:

${message}
`;
    await sendSMS(messageTemplate);
    res.status(200).send({ success: true });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});