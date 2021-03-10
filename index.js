const express = require('express')

const path = require('path')

const app = express()

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//static folder
app.use(express.static(path.join(__dirname,'public')))

//member api routes
app.use('/api/member',require('./routes/api/member'))


const PORT = process.env.PORT||5000


app.listen(PORT,()=>
 console.log(`server listen at port ${PORT}`)
)
