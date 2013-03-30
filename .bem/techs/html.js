var BH = require('./lib/bh'),
    vm = require('vm');

module.exports = require('enb/lib/build-flow').create()
    .name('bh')
    .target('target', '?.html')
    .useFileList('bh.js')
    .useSourceText('bemjsonTarget', '?.bemjson.js')
    .builder(function(bhFiles, bemjson) {
        var bh = new BH();
        bhFiles.forEach(function(bhFile) {
            var matcher = require(bhFile.fullname);
            matcher(bh);
        });
        return bh.toHtml(bh.processBemjson(vm.runInThisContext(bemjson)));
    })
    .createTech();

