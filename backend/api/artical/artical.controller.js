var Articlas = require('./artical.doa');
exports.createArtical = function (req, res, next) {
    var artical = {  
      title: req.body.title,
      slug: req.body.slug,
      images : [req.body.images],
      description: req.body.description,
      metaTitle: req.body.metaTitle,
      metaKeyword: req.body.metaKeyword,
      metaDescription: req.body.metaDescription,
      order: req.body.order
    };
    
    Articlas.articalcreate(artical, function(err, artical) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Artical created successfully"
        })
    })
}

exports.getArticals = function(req, res, next) {
    const limit = req.params.limit;
    const query = Articlas;
    const artical = query.get({},limit, function(err, articals) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            articals:articals
        })
    });
}

exports.getArticalsTotal = function(req, res, next) {
    const query = Articlas;
    query.getcount({}, function(err, total) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            articals_total:total
        })
    })
}

exports.getArtical = function(req, res, next) {
    Articlas.getByid({"_id": req.params.id}, function(err, artical) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            artical: artical
        })
    })
}

exports.updateArtical = function(req, res, next) {
    var artical = {
        title: req.body.title,
        slug: req.body.slug,
        images : [req.body.images],
        description: req.body.description,
        metaTitle: req.body.metaTitle,
        metaKeyword: req.body.metaKeyword,
        metaDescription: req.body.metaDescription,
        order: req.body.order
      };
    Articlas.update({_id: req.params.id}, artical, function(err, artical) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "artical updated successfully"
        })
    })
}

exports.removeArtical  = function(req, res, next) {
    Articlas.delete({_id: req.params.id}, function(err, artical) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "artical deleted successfully"
        })
    })
}