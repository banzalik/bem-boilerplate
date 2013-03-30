module.exports = function(bh) {

    bh.match('i-jquery__core', function(ctx) {
        return {
            block: 'b-page',
            elem: 'js',
            url: '//yandex.st/jquery/1.7.2/jquery.min.js'
        };
    });

};