module.exports = function(bh) {

    bh.match('b-page__js', function(ctx) {
        ctx.bem = false;
        ctx.tag = 'script';
        ctx.attrs.src = ctx.url;
    });

};