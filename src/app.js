const express = require('express')
const cors = require('cors')
const { decryptSignature } = require('./utils/encryption-utils')

const auth = require('./routes/users/auth/auth')
const fullData = require('./routes/mainRoutes')
const profile = require('./routes/profile/profile')
const login = require("./routes/users/log/login")
const updatePassword = require("./routes/users/updatePassword/updatePass")
const sendMessage = require('./routes/chats/messages/message')
const conversation = require('./routes/chats/Conversation/converstion')

const SIGNATURE_ENCRYPTED = '589cc0a78da0cfd81f1f3771962273ad:25e32024c78e7c370aec88afa2961f4e60bc623692f275c41564307d913f5829'

// const verifyToken = require('./middleware/authMiddleware')

const app = express();
app.use(cors())
app.use(express.json())


app.locals.signature = SIGNATURE_ENCRYPTED;
app.locals.decryptSignature = decryptSignature;

app.use(fullData)
app.use(auth)
app.use(login)
app.use(updatePassword)
app.use(profile)
app.use(sendMessage)
app.use(conversation)

app.use((req, res) => {
 res.status(404).send("Sorry, can't find that!")
});

module.exports = app
