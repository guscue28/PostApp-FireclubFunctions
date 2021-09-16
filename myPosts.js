module.exports = function (db) {
  return function (req, res) {
    const { uid } = req.body;
    console.log(req.body);

    if (!uid) return res.status(400).send({ err: 'no se ha enviado un identificador' });

    return db.collection('posts').where('uid', '==', uid).get()
      .then((querySnapshop) => {
        const data = [];
        querySnapshop.forEach(i => { data.push(i.data())});
        return res.status(200).send({ data });
      })
      .catch((error) => {
        console.log(error);
        res.status(501).send({ err: 'algo salio mal', error })
      });
  }
}