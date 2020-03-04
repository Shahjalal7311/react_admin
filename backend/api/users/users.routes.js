const auth = require("../../middleware/auth");
var Users = require('./users.controller');
var fileUploadHandler = require('../../../upload');
var multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Applications/MAMP/htdocs/recat-partice/react_admin/public/uploads')
  },
  filename: function (req, file, cb) { 
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage});
// const upload = multer({ dest: '/Applications/MAMP/htdocs/recat-partice/react_admin/public/uploads' });

module.exports = function(router) {
    router.post('/usercreate', auth, Users.createUser);
    router.get('/usersget', auth, Users.getUsers);
    router.get('/userget/:id', auth, Users.getUser);
    router.put('/userupdate/:id', auth, Users.updateUser);
    router.delete('/userremove/:id', auth, Users.removeUser);
    router.post('/userlogin/', Users.userLogin);
    router.post('/fileupload', upload.any(), fileUploadHandler);
}