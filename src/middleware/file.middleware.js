const multer = require('@koa/multer')

const uploadFile = multer({
  storage: multer.diskStorage({
    destination(req,file,cb) {
      cb(null,'./uploads')
    },
    filename(req,file,cb){
      cb(null,Date.now() + '_' + file.originalname)
    }
  })
  // dest:'./uploads'
})

const handleFile = uploadFile.single('avatar')

module.exports = handleFile