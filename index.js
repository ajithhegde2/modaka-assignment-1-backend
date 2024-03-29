const express = require('express')
const cors = require('cors')
const { sendToS3, getPresignedUrl } = require('./src/aws/s3')
require('dotenv').config()
const multer = require('multer')
const storage = multer.memoryStorage() // Use in-memory storage for handling files as buffers
const upload = multer({ storage })
require('./src/db/db.connect')

const Image= require('./src/model/image')

Image.sync({ alter: true })




const app = express()
app.use(cors())
app.use(express.json({ limit: '5mb' })); 

app.post('/api',upload.any(), async(req,res,next)=>{

  try {
     const response = await sendToS3(req.files[0])
     const image = await Image.create({ key: response ,fileName: req.files[0].originalname})
     res.json(image)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
})

app.get('/api', async (req, res, next) => {
  try {
    const image = await Image.findAll()
    const result = await Promise.all(image.map(async ele =>{
      ele.dataValues.url = await getPresignedUrl(ele.key)
      return ele
    }))
    res.json(result)
  } catch (error) {
    res.status(500).json(error)
  }
})


app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`)
})