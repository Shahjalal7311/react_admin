var Articals = require('./artical.controller');

module.exports = function(router) {
    router.post('/articalcreate', Articals.createArtical);
    router.get('/articalsget', Articals.getArticals);
    router.get('/singlearticalget/:name', Articals.getArtical);
    router.put('/singlearticalupdate/:id', Articals.updateArtical);
    router.delete('/articalremove/:id', Articals.removeArtical);
}