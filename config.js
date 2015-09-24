module.exports = {
  version: 'v1',
  db: {
    client: 'mongodb',
    url: process.env.DB_URL || 'mongodb://localhost:27017/easyace-api'
  },
  http: {
    port: process.env.PORT || 8080,
    socket: {
      maxNo: 50
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'hello@easyace.ca'
  },
  dropbox: {
    appKey: process.env.DROPBOX_APP_KEY || '<your_dropbox_app_key>',
    appSecret: process.env.DROPBOX_APP_SECRET || '<your_dropbox_app_secret>',
    accessToken: process.env.DROPBOX_ACCESS_TOKEN || '<your_dropbox_access_token>'
  }
};
