const { v4: uuidv4 } = require('uuid');

module.exports = function (db) {
  return function (req, res) {
    if (req.method === 'GET') {
      return db.collection('posts').get()
        .then((querySnapshop) => {
          const data = [];
          querySnapshop.forEach(i => data.push(i.data()));
          return res.status(200).send({ data });
        })
        .catch(error => res.status(501).send({ err: 'Algo salio mal', error }))
    }

    if (req.method === 'POST') {
      const { title, content, image, uid } = req.body;
      console.log(req.body);
      
      if (!title) return res.status(400).send({ err: 'no se ha enviado un titulo' });
      if (!content) return res.status(400).send({ err: 'no se ha enviado un contenido' });
      if (!image) return res.status(400).send({ err: 'no se ha enviado una imagen' });
      if (!uid) return res.status(400).send({ err: 'no se ha enviado un identificador' });


      const post = {
        title,
        content,
        image,
        uid,
        uuid: uuidv4(),
      };

      return db.collection('posts').doc().set(post)
        .then(() => {
          return res.status(200).send({ data: post });
        })
        .catch((error) => {
          console.log(error);
          res.status(501).send({ err: 'algo salio mal', error })
        });
    }

    if (req.method === 'DELETE') {
      const { uuid } = req.body;
      console.log(req.body);

      if (!uuid) return res.status(400).send({ err: 'no se ha enviado un identificador' });

      return db.collection('posts').where('uuid', '==', uuid).get()
        .then((querySnapshop) => {
          let id = 0;
          querySnapshop.forEach(i => { id = i.id });

          return db.collection('posts').doc(id).delete().then(() => {
            return res.status(200).send({ data: { menssage: 'se elimino el contenido' } });
          })
            .catch((error) => {
              console.log(error);
              res.status(501).send({ err: 'algo salio mal', error })
            });
        })
    }

    if (req.method === 'PUT') {
      const { title, content, image, uuid } = req.body;
      console.log(req.body);

      if (!title) return res.status(400).send({ err: 'no se ha enviado un titulo' });
      if (!content) return res.status(400).send({ err: 'no se ha enviado un contenido' });
      if (!image) return res.status(400).send({ err: 'no se ha enviado una imagen' });
      if (!uuid) return res.status(400).send({ err: 'no se ha enviado un identificador' });


      const post = {
        title,
        content,
        image,
      };

      return db.collection('posts').where('uuid', '==', uuid).get()
        .then((querySnapshop) => {
          let id = 0;
          querySnapshop.forEach(i => { id = i.id });

          return db.collection('posts').doc(id).update(post).then(() => {
            return res.status(200).send({ data: { menssage: 'se elimino el contenido' } });
          })
            .catch((error) => {
              console.log(error);
              res.status(501).send({ err: 'algo salio mal', error })
            });
        })

    }
    
    return res.status(501).send({ err: 'No se permite este metodo' });
  }
} 