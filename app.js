const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require("dotenv").config();
 

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth-router');




const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use('/users', authRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
 
 res.status(err.status || 500).json({ message: err.message })})

module.exports = app


// const ElasticEmail = require('@elasticemail/elasticemail-client');
 
// const defaultClient = ElasticEmail.ApiClient.instance;

// const { ELASTICEMAIL_API_KEY } = process.env;
 
// const { apikey } = defaultClient.authentications;
// apikey.apiKey = ELASTICEMAIL_API_KEY;
 
// const api = new ElasticEmail.EmailsApi()
 
// const email = ElasticEmail.EmailMessageData.constructFromObject({
//   Recipients: [
//     new ElasticEmail.EmailRecipient("rayagi1138@kkoup.com")
//   ],
//   Content: {
//     Body: [
//       ElasticEmail.BodyPart.constructFromObject({
//         ContentType: "HTML",
//         Content: "<p>Verify email</p>"
//       })
//     ],
//     Subject: "Verify email",
//     From: "alenkaalexon4ik@gmail.com "
//   }
// });
 
// const callback = function(error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('API called successfully.');
//   }
// };
// api.emailsPost(email, callback);

