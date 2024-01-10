const express = require('express')
const cors = require('cors')
const { sendToS3 } = require('./src/aws/s3')
require('dotenv').config()
const multer = require('multer')
const storage = multer.memoryStorage() // Use in-memory storage for handling files as buffers
const upload = multer({ storage })

const app = express()
app.use(cors())
app.use(express.json({ limit: '5mb' })); 

app.post('/api',upload.any(), async(req,res,next)=>{

   const res = sendToS3(req.files[0])
  res.json(res)
})


app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`)
})