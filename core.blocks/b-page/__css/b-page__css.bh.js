module.exports = function(bh) {

    bh.match('b-page__css', function(ctx, json) {
        ctx.bem(false);

        if (json.url) {
            ctx.tag('link');
            ctx.attr('rel', 'stylesheet');
            ctx.attr('href', json.url);
        } else {
            ctx.tag('style');
        }

        if (json.hasOwnProperty('ie')) {
            var ie = json.ie;
            if (ie === true) {
                return [6, 7, 8, 9].map(function(v) {
                    return { elem: 'css', url: json.url + '.ie' + v + '.css', ie: 'IE ' + v }
                });
            } else {
                var hideRule = !ie ?
                    ['gt IE 9', '<!-->', '<!--'] :
                    ie === '!IE' ?
                        [ie, '<!-->', '<!--'] :
                        [ie, '', ''];
                return [
                    '<!--[if ' + hideRule[0] + ']>',
                    hideRule[1],
                    json,
                    hideRule[2],
                    '<![endif]-->'
                ];
            }
        }
    });

};