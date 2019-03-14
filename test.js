import test from 'ava'
var axios = require('axios');

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
      const responseGet = await axios.post('https://cryptic-basin-35008.herokuapp.com/ville', {
        nom_ville: "Paris"
      });

      t.is(responseGet.data.toString().includes("Paris"), true);
    } catch (e) {
      t.fail("Erreur serveur!")
    }
});
