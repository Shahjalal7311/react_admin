var Articals = require('./artical.controller');
const auth = require("../../middleware/auth");

module.exports = function(router) {
    router.post('/articalcreate', auth, Articals.createArtical);
    router.get('/articalsget/:limit', auth, Articals.getArticals);
    router.get('/articalstotal', auth, Articals.getArticalsTotal);
    router.get('/singlearticalget/:id', auth, Articals.getArtical);
    router.put('/singlearticalupdate/:id', auth, Articals.updateArtical);
    router.delete('/articalremove/:id', auth, Articals.removeArtical);
}