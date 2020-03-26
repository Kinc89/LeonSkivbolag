const request = require('supertest')

describe('Using express', () => {

// here is a problem: we cannot export the server (or app in our case) from index.js, because it's not good practice to export as a module our server/app. How to solve this?
let server;

    beforeEach(() => {
        server = require('../index') // here is not "possible", since we don't export our server from index.js (which would create a 'leaking' server).
    })

    it('Should respond to /', (done) => {
        request(server)
            .get('/')
            .expect(200, done)
    })

    it('Should respond to /cart', (done) => {
        request(server)
            .get('/cart')
            .expect(200, done)
    })

    it('Should get a 403 to /admin', (done) => {
        request(server)
            .get('/admin')
            .expect(403, done)
    })

    afterEach(() => {
        server.close()
    })
})