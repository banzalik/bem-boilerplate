module.exports = function(bh) {

    bh.match('b-page__js', function(ctx) {
        ctx.bem = false;
        ctx.tag = 'script';
        
        if (ctx.url) {
            ctx.attrs.src = ctx.url;
        }
    });

};
