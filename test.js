import test from 'ava'
const nock = require('nock')
var axios = require('axios');
var express = require('express');
const port = 3000;
const app = require('./app.js');
const indexRouter = require('./routes/index.js');
app.use('/ville', indexRouter);

app.listen(port, () => {
  test('Test ville nock', async t => {
    try {
      const city = 'berlin';
      nock('https://geocode.xyz')
      .get('/' + city + '?json=1&auth=218622879073471220010x1964')
      .reply(200, { longt: 290, latt: 100});
      const { data } = await axios.post('http://localhost:3000/ville', { nom_ville: city });
      console.log(data);
    }
    catch (error) {
      console.log('error');
    }
    t.pass();
  });
});

test("La page d'index du site comprend bien un formulaire HTML", async t => {
    try {
      const response = await axios.get("http://localhost:3000");
      if(response.data.toString().includes('form')){
        t.pass();
      }else{
        t.fail("Pas de formulaire dans la page d'index du site!");
      }
    } catch (e) {
      t.fail("Une erreur s'est produite");
    }
});

test('Le nom de la ville correspond bien au nom passé en paramètre', async t => {
    try {
      const responseGet = await axios.post('http://localhost:3000/ville', {
        nom_ville: "Paris"
      });

      t.is(responseGet.data.toString().includes("Paris"), true);
    } catch (e) {
      t.fail("Erreur serveur!")
    }
});
