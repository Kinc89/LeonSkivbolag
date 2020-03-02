// Test för server.js
const supertest = require('supertest')
const { app, port } = require('../src/server') // hämtar in app och port från server.js

describe('Router tests', () => { // Huvudrubrik till våra test
    let server

    beforeEach(() => {                          // beforeEach körs innan varje 'it' test
        server = app.listen(port, () => console.log('                  >>>>>>>>>>>> Testing server up')) // servern körs igång
    })

    it('Should respond to /library', (done) => {       // Ett test för att se om servern svarar på get /
        supertest(server).get('/library').expect(200, done());   // vi testar om vi får svar på /
    })

    it('Should respond to /album', (done) => {
        supertest(server).get('/album').expect(200, done)
    })

    it('Should respond to post /add-album', (done) => {
        supertest(server).post('/add-album').expect(302, done)
    })

    it('Should respond to /', (done) => {
        supertest(server).get('/').expect(200, done())
    })

    it('Should respond to get /add-album', (done) => {
        supertest(server).get('/add-album').expect(200, done)
    })

    afterEach((done) => {                       // afterEach körs efter varje 'it' test
        server.close(done)                          // servern stängs
    })
})