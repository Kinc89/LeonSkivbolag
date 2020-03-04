function getSpotifyData () {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=a9bd98edbf62437e2542a87294e156da&artist=Cher&album=Believe&format=json", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

getSpotifyData();
