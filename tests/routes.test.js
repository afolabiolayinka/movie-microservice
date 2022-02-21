const request = require('supertest')
const auth = require('../src/auth-service/server')
const app = require('../src/movie-service/app')
describe('Post Endpoints', () => {
    it('should create a new movie', async () => {
        const token = await request(auth)
            .post('/auth')
            .send({
                username: "basic-thomas",
                password: "sR-_pcoow-27-6PAwCD8",
            })

        const res = await request(app)
            .post('/movies')
            .send({
                Title: "Mission Impossible"
            }).set('Authorization', 'Bearer '.token.body)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('status')
    })
})