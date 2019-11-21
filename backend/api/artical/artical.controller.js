var Articlas = require('./artical.doa');

exports.createArtical = function (req, res, next) {
    var artical = {  
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      metaTitle: req.body.metaTitle,
      metaKeyword: req.body.metaKeyword,
      metaDescription: req.body.metaDescription
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
    Articlas.get({}, function(err, articals) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            articals: articals
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
        description: req.body.description,
        metaTitle: req.body.metaTitle,
        metaKeyword: req.body.metaKeyword,
        metaDescription: req.body.metaDescription
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