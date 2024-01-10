const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")




 const sendToS3 = async (file) => {
const client = new S3Client({
  region: process.env.MY_AWS_REGION,
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  },
})

  
  
  const command = new PutObjectCommand({
    Bucket: process.env.MY_AWS_S3_BUCKET_NAME,
    Key: Date.now().toString(),
    Body: file.buffer, // Assuming file.buffer contains the file data
    ContentType: file.mimetype,
    ContentEncoding: 'base64',
  })

  try {
    const response = await client.send(command)
    return response
  } catch (err) {
   return new Error(err)
  }
}

module.exports = { sendToS3 }
