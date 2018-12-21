class Loader {
   include(url, callback){
       // Create script tag
       var script = document.createElement('script');
       script.type = 'text/javascript';
       //  Add src with timestamp to avoid cache problems
       script.src = url + '?' + (new Date().getTime());
       // Execute callback function when script is loaded
       if (callback) {
           script.onreadystatechange = callback;
           script.onload = script.onreadystatechange;
       }
       // Add Tag and load script
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
       .catch((error) => {
         console.log('Request failed', error)
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

     })
     .catch (function (error) {
         console.log('Request failed', error)
     })
   }
}

const loader = new Loader()
if(method) loader.include(`client/js/${method}.js`)
