const multer = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })
module.exports = upload
