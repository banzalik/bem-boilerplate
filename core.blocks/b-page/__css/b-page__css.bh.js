module.exports = function(bh) {

    bh.match('b-page__css', function(ctx) {
        ctx.tag = 'style';
        ctx.bem = false;

        if (ctx.hasOwnProperty('ie') && !ctx._ieCommented) {
            var ie = ctx.ie;
            if (ie === true) {
                return [6, 7, 8, 9].map(function(v) {
                    return { elem: 'css', url: ctx.url + '.ie' + v + '.css', ie: 'IE ' + v }
                });
            } else {
                var hideRule = !ie ?
                    ['gt IE 9', '<!-->', '<!--'] :
                    ie === '!IE' ?
                        [ie, '<!-->', '<!--'] :
                        [ie, '', ''];
                ctx._ieCommented = true;
                return [
                    '<!--[if ' + hideRule[0] + ']>',
                    hideRule[1],
                    ctx,
                    hideRule[2],
                    '<![endif]-->'
                ];
            }
        }

        if (ctx.url) {
            ctx.tag = 'link';
            ctx.attrs.rel = 'stylesheet';
            ctx.attrs.href = ctx.url;
        }
    });

};
