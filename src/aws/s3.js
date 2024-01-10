const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")




 const sendToS3 = async (file) => {
const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

  
  
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: Date.now().toString(),
    Body: file.buffer, // Assuming file.buffer contains the file data
    ContentType: file.mimetype,
    ContentEncoding: 'base64',
  })

  try {
    const response = await client.send(command)
    console.log(response)
  } catch (err) {
    console.error(err)
  }
}

module.exports = { sendToS3 }