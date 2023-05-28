import express from 'express'

import mongoose from 'mongoose'
import { productCreateValidation } from './validations/validation.js'
import cors from 'cors'
import { validationErrors } from './utils/index.js'
import multer from 'multer'
import { ProductController } from './controllers/index.js'
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.MONGODB_API_KEY).then(() => {
  console.log('db ok')
}).catch((err) => console.log(`err ${err}`))

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    console.log(file)
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return req.statusCode(501);
    }
  }
})



app.use(express.json())
app.use(cors())
app.get('/', (request, response) => {
  response.send('H11i')
})





app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.use('/uploads', express.static('uploads'))
app.get('/products', ProductController.getAll)
app.delete('/product/:id', ProductController.remove)
app.post('/products', productCreateValidation, validationErrors, ProductController.create)
app.patch('/product/:id', productCreateValidation, validationErrors, ProductController.update)
app.get('/product/:id', ProductController.getOne)

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('ok')
})
