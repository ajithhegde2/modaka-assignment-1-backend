const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")




 const sendToS3 = async (file) => {
const client = new S3Client({
  region: process.env.MY_AWS_REGION,
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  },
})

  const params = {
    Bucket: process.env.MY_AWS_S3_BUCKET_NAME,
    Key: Date.now().toString(),
    Body: file.buffer, // Assuming file.buffer contains the file data
    ContentType: file.mimetype,
    ContentEncoding: 'base64',
  }
  


  try {
    const response = await client.send(new PutObjectCommand(params))
    return params.Key
  } catch (err) {
   return new Error(err)
  }
}

async function getPresignedUrl(key) {
  const command = new GetObjectCommand({
      Bucket: process.env.MY_AWS_S3_BUCKET_NAME,
      Key: key,
    })
   const client = new S3Client({
     region: process.env.MY_AWS_REGION,
     credentials: {
       accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
       secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
     },
   })
    try {
      const url = await getSignedUrl(client, command, { expiresIn: 900 })
      return url
    } catch (error) {
      return new Error(`internal error : ${error}`)
    }
  
    
}

module.exports = { sendToS3, getPresignedUrl }
