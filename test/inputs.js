module.exports = {
  login: [{
      body: {
        user: 'gwege',
        password: 'gwegwe',
        fe: 'sss'
      },
      expected: {
        status: 400,
        data: 'Bad Request'
      }
    },
    {
      body: {
        user: 'gwege',
        password: 'gwegwe',
      },
      expected: {
        status: 200,
        data: 'OK'
      }
    },
  ],
  add: [{
      body: {
        "add": {
          "user": "fefwe",
          "password": "gewgwe",
          "email": "gwegwgwe"
        }
      },
      expected: {
        status: 400,
        data: [
          ".email should match format \"email\""
        ]
      }

    },
    {
      body: {
        "add": {
          "user": "fefwe",
          "password": ""
        }
      },
      expected: {
        status: 400,
        data: [
          ".password should NOT be shorter than 1 characters",
          "should have required property 'email'"
        ]
      }

    },
    {
      body: {
        "add": {
          "user": "fefwe",
          "password": "dagasgds",
          "email": "efw@gr.gwe"
        }
      },
      expected: {
        status: 200,
        data: "OK"
      }
    },
  ]
}