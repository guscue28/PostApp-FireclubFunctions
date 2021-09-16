const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function (req, res) {
    // res.status(200).send(req.body);
  const { email, phoneNumber, password, displayName } = req.body;
  console.log(req.body);
    //validar los campos necesarios
  if (!email) return res.status(404).send({ err: 'no se ha enviado un email' });
  if (!phoneNumber) return res.status(404).send({ err: 'no se ha enviado un numero de telefono' });
  if (!password) return res.status(404).send({ err: 'no se ha enviado una password' });
  if (!displayName) return res.status(404).send({ err: 'no se ha enviado un nombre' });
    //crear el usuario 
  admin.auth().createUser({
    email,
    phoneNumber,
    password,
    displayName,
    emailVerified: false,
    photoURL: 'https://picsum.photos/50/50',
    disabled: false
  }).then((usr) => {
    res.status(200).send(usr)
    console.log({ usr })
  })
    .catch((error) => {
      console.log(error);
      res.status(501).send({ err: 'algo salio mal', error })
    });

    //retorno de información
}