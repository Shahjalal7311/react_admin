var Categorys = require('./category.controller');
const auth = require("../../middleware/auth");

module.exports = function(router) {
    router.post('/categorycreate', auth, Categorys.createCategorys);
    router.get('/categoryget/:limit', auth, Categorys.getCategorys);
    router.get('/categorystotal', auth, Categorys.getCategoryssTotal);
    router.get('/singlecategoryget/:id', auth, Categorys.getCategory);
    router.put('/singlecategoryupdate/:id', auth, Categorys.updateCategory);
    router.delete('/categoryremove/:id', auth, Categorys.removeCategory);
}