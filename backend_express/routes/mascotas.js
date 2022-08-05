var express = require('express');
var bodyParser = require('body-parser')
var petId= 0;
var router = express.Router();

const connect = require('./db_pool_connect');

/**
 * Listar todos los usuarios
 */
router.get('/', function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query('SELECT * FROM ptype as t NATURAL JOIN pet as p;', function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running query', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });

})

/**
 * Buscar un usuario dado su id_usuario
 */
router.get('/:id', function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT * FROM pet WHERE pet_id=${req.params.id};`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running query', err);
      }
      res.send(JSON.stringify(result.rows[0]));
    });
  });

})

/**
 * Crear un usuario dados su nombre de usuario y password. 
 * !Antes de crearlo debería verificar si ya existe.
 */
router.post('/', function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    if ( req.body.ptype=='Gato'){
      petId=1;
    }
    else if ( req.body.ptype=='Perro'){
      petId=2;
    }
    //use the client for executing the query
    client.query(`INSERT INTO  pet(pet_name,age,ptype_id) VALUES ('${req.body.pet_name}', '${req.body.age}', '${petId}');`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        return console.error('error running query', err);
      }
      res.redirect('/mascotas'); 
    });
    
  });

})

module.exports = router;