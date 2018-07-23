let app = require('./app.js')
let port = process.env.PORT || 1234

let server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})