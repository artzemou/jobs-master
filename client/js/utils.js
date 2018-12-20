class Utils {
   /* *** DEFINITION DES METHODES *** */
   include(url, callback){
       /* on crée une balise<script type="text/javascript"></script> */
       var script = document.createElement('script');
       script.type = 'text/javascript';
       /* On fait pointer la balise sur le script qu'on veut charger
          avec en prime un timestamp pour éviter les problèmes de cache
       */
       script.src = url + '?' + (new Date().getTime());
       /* On dit d'exécuter cette fonction une fois que le script est chargé */
       if (callback) {
           script.onreadystatechange = callback;
           script.onload = script.onreadystatechange;
       }
       /* On rajoute la balise script dans le head, ce qui démarre le téléchargement */
       document.getElementsByTagName('head')[0].appendChild(script);
   }

   get(url, callback) {
     fetch(url)
       .then((res) => {
           return res.json()
       })
       .then((data) => {
         callback(data)
       })
       .catch((errors) => {
         console.log(errors)
       });
   }

   post(body){
     fetch('output', {
       method: 'post',
       headers: {
           'Accept': 'application/json, text/plain, */*',
           'Content-Type': 'application/json'
       },
       body: body
     })
     .then(function (response) {
         console.log(response)
     })
     .catch (function (error) {
         console.log('Request failed', error);
     })
   }
}

const utils = new Utils()

utils.include(`client/js/${method}.js`)
