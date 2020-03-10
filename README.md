A very simple `express` middleware to check user data against a given schema. 

* `ajv` is used for schema validation
* `dot-prop` is used for finding a given key in `req` object 

# validate(schema, key[, onInvalid])

* `schema` \<object> json schema object
* `key` \<string> key to be found in `req` object, `dot-prop` is used, so dot notation is allowed, eg. `'body.data.someFancyObject'`
* `onInvalid` \<function> function that is called when validation fails; if not specified, the middleware will send `400`. The function has the following signature: 
  
  `onInvalid(error, req, res, next)`
  * `error` \<array> [ajv validation errors](https://ajv.js.org/#validation-errors)
  * other parameters are standard `express` middleware parameters

* Returns a middleware function that can be passed to `app.use`. 

# validate.withOptions(options)

* `options` \<object> options to be passed to the `ajv` constructor. 
* Returns new `validate` middleware generator.

By default, `validate` uses `ajv` instance that was created without any additional options. In case you need a more tweaked version, `withOptions` function will let you adjust [any available options](https://ajv.js.org/#options).


Example usage:
```js
const express = require('express')
const app = express();
// require your schemas
const loginSchema = require('./schemata/login')
const addSchema = require('./schemata/add')

// get the default middleware generator
// it will use new Ajv() called with no additional options
const schemaValidation = require('./checkAgainstSchema')

// create another instance of the middleware generator
// with custom options that will be passed to new instance of Ajv
const allErrors = schemaValidation.withOptions({
  allErrors: true
})

// by default, in case of validation failure,
// res.sendStatus(400) is called
const loginSchemaValidation = schemaValidation(loginSchema, 'body')

// you can specify a custom function to be called on validation failure
const addSchemaValidation = allErrors(addSchema, 'body.add', (errors, req, res, next) => {
  res.status(400).json(errors.map(({
    dataPath,
    message
  }) => `${dataPath ? dataPath + ' ' : ''}${message}`))
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
```
