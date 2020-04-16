var Categorys = require('./category.doa');
exports.createCategorys = function (req, res, next) {
    var category = {  
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      order: req.body.order
    };
    
    Categorys.categorycreate(category, function(err, category) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Categorys created successfully"
        })
    })
}

exports.getCategorys = function(req, res, next) {
    const limit = req.params.limit;
    const query = Categorys;
    const category = query.get({},limit, function(err, categorys) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            categorys:categorys
        })
    });
}

exports.getCategoryssTotal = function(req, res, next) {
    const query = Categorys;
    query.getcount({}, function(err, total) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            categorys_total:total
        })
    })
}

exports.getCategory = function(req, res, next) {
    Categorys.getByid({"_id": req.params.id}, function(err, category) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            category: category
        })
    })
}

exports.updateCategory = function(req, res, next) {
    var category = {
        title: req.body.title,
        slug: req.body.slug,
        description: req.body.description,
        order: req.body.order
      };
      Categorys.update({_id: req.params.id}, category, function(err, category) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Categorys updated successfully"
        })
    })
}

exports.removeCategory  = function(req, res, next) {
    Categorys.delete({_id: req.params.id}, function(err, category) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Categorys deleted successfully"
        })
    })
}