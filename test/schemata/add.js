module.exports = {
  additionalProperties: false,
  type: 'object',
  properties: {
    user: {
      type: "string",
      minLength: 1,
      maxLength: 25
    },
    password: {
      type: "string",
      minLength: 1,
      maxLength: 25
    },
    email: {
      type: "string",
      format: 'email'
    },
  },
  required: ['user', 'password', 'email']
}