const app = require('./app')
const axios = require('axios');
const http = require('http')
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;
const post = axios.create({
  baseURL: `http://localhost:${PORT}`,
  method: 'post',
  validateStatus: status => status < 500
})
const chai = require('chai');
const expect = chai.expect
const inputs = require('./inputs')

describe('Testing middleware', () => {
  before(done => server.listen(PORT, done))
  after(() => process.exit(0))

  for (const route of Object.keys(inputs))
    getTests(route, inputs[route])
})

function getTests(route, test) {
  describe(`Checking ${route} route`, () => {
    for (const test of inputs[route])
      it(`Should have status: ${test.expected.status}`, async () => {
        const {
          status,
          data
        } = await post({
          url: '/' + route,
          data: test.body,
        });
        expect(status).to.equal(test.expected.status);
        expect(data).to.deep.equal(test.expected.data);
      })
  })
}