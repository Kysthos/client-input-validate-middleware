const express = require('express')
const app = express();
// require your schemas
const loginSchema = require('./schemata/login')
const addSchema = require('./schemata/add')
// get the default middleware generator
// it will use new Ajv() called with no additional options
const schemaValidation = require('..')
// create another instance of the middleware generator
// with custom options that will be passed to new instance of Ajv
const allErrors = schemaValidation.withOptions({
  allErrors: true
})

// by default, if body is won't be valid, res.sendStatus(400) is called
const loginSchemaValidation = schemaValidation(loginSchema, 'body')
// you can specify a custom function to be called on validation failure
const addSchemaValidation = allErrors(addSchema, 'body.add', (errors, req, res, next) => {
  // errors is an array created by ajv validation
  // [{
  //   keyword: 'required',
  //   dataPath: '',
  //   schemaPath: '#/required',
  //   params: { missingProperty: 'password' },
  //   message: "should have required property 'password'"
  // }]
  res.status(400).json(errors.map(({
    dataPath,
    message
  }) => `${dataPath ? dataPath + ' ' : ''}${message}`))
  // If server will get, eg., such a request:
  // {
  //   "add": {
  //     "user": "",
  //     "email": "gwegwgwe"
  //   }
  // }
  // It will respond with status 400 and such response:
  // [ ".user should NOT be shorter than 1 characters",
  //   "should have required property 'password'",
  //   ".email should match format \"email\""]
})

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

app.post('/login', loginSchemaValidation, (req, res) => {
  res.sendStatus(200)
})

app.post('/add', addSchemaValidation, (req, res) => {
  res.sendStatus(200)
})

app.use((err, req, res, next) => {
  res.status(400).send(err.message);
})

module.exports = app;
