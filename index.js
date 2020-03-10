const dotProp = require('dot-prop');
const Ajv = require('ajv');

const newInstance = (options) => {
  const ajv = new Ajv(options);

  return (schema, key, onInvalid) => {
    if (!onInvalid)
      onInvalid = (err, req, res) => res.sendStatus(400);
    if (typeof onInvalid !== 'function')
      throw new TypeError(`Third argument should be a function. Received type ${typeof onInvalid}.`);

    const validate = ajv.compile(schema);

    return (req, res, next) => {
      const valid = validate(dotProp.get(req, key));
      if (!valid) return onInvalid(validate.errors, req, res, next);
      next();
    }
  }
}

module.exports = newInstance();
module.exports.withOptions = newInstance;