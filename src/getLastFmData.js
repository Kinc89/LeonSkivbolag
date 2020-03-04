const fetch = require('node-fetch');

function getLastFmData () {

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
      
    fetch("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=a9bd98edbf62437e2542a87294e156da&artist=Cher&album=Believe&format=json", requestOptions)
        .then(res => res.json())
        .then( (json) => {
            return json;
        })
        .catch(error => console.log('error', error));

}

module.exports = getLastFmData;


