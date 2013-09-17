module.exports = function(bh) {

    bh.match('i-jquery__core', function(ctx) {
        return {
            block: 'b-page',
            elem: 'js',
            url: '//yandex.st/jquery/2.0.3/jquery.min.js'
        };
    });

};