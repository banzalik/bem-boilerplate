module.exports = function(bh) {

    bh.match('b-page:default', function(ctx) {
        return [
            { elem: 'doctype', doctype: ctx.doctype || '<!DOCTYPE HTML>' },
            {
                elem: 'html',
                content: [
                    {
                        elem: 'head',
                        content: [
                            [
                                {
                                    tag: 'meta',
                                    attrs: { charset: 'utf-8' }
                                },
                                ctx['x-ua-compatible'] === false
                                    ? false
                                    : { elem: 'xUACompatible', 'x-ua-compatible': ctx['x-ua-compatible'] },
                                {
                                    tag: 'title',
                                    content: ctx.title
                                },
                                ctx.favicon ? {
                                    elem: 'favicon',
                                    url: ctx.favicon
                                } : '',
                                ctx.meta,
                                {
                                    block: 'i-ua'
                                }
                            ],
                            ctx.head
                        ]
                    },
                    ctx
                ]
            }
        ];
    });

    bh.match('b-page', function(ctx) {
        ctx.mix = [{elem: 'body'}];
        ctx.tag = 'body';
    });

    bh.match('b-page__xUACompatible', function(ctx) {
        return {
            tag: 'meta',
            attrs: { 'http-equiv': 'X-UA-Compatible', content: ctx['x-ua-compatible'] || 'IE=EmulateIE7, IE=edge' }
        };
    });

    bh.match('b-page__html', function(ctx) {
        ctx.tag = 'html';
        ctx.bem = false;
        ctx.cls.push('i-ua_js_no i-ua_css_standard');
    });

    bh.match('b-page__head', function(ctx) {
        ctx.tag = 'head';
        ctx.bem = false;
    });

    bh.match('b-page__meta', function(ctx) {
        ctx.tag = 'meta';
        ctx.bem = false;
    });

    bh.match('b-page__doctype', function(ctx) {
        return ctx.doctype;
    });

    bh.match('b-page__favicon', function(ctx) {
        ctx.bem = false;
        ctx.tag = 'link';
        ctx.attrs.rel = 'shortcut icon';
        ctx.attrs.href = ctx.url;
    });

};