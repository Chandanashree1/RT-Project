const app = require('./src/app')
const mongo =  require('./src/config/db')

mongo()
app.listen(3000, () => console.log("Server 3000 is running"))