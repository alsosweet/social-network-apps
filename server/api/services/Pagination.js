/**
 * BrowseServices
 *
 * @description :: Server-side logic for managing settings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/BrowseServices
 */
module.exports = {

    page:function(req, res){
        perpage = req.param('perpage') || 10;
        var page = Math.max(
                parseInt(req.param('page') || '1', 10),
                1
            );
        req.page = res.locals.page = {
            number: page,
            perpage: perpage,
            from: page * perpage,
            to: page * perpage + perpage - 1,
            total: req.total,
            count: Math.ceil(req.total / perpage)
        };
    },
};
