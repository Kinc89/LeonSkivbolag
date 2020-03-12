const Album = require("../../model/album"); 

async function checkIfAlbumExists (artist, album) {

    const foundAlbum = await Album.findOne({ name: album, artist: artist })

    console.log("foundAlbum? ", foundAlbum);

    return foundAlbum
}

module.exports = checkIfAlbumExists;


