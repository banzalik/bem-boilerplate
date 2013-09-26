module.exports = function(config) {
    config.node('pages-desktop/index');

    config.nodeMask(/pages\-desktop\/.*/, function(nodeConfig) {
        nodeConfig.addTechs([
            new (require('enb/techs/file-provider'))({ target: '?.bemjson.js' }),
            new (require('enb/techs/bemdecl-from-bemjson'))(),
            new (require('enb/techs/levels'))({ levels: getLevels(config) }),
            new (require('enb/techs/deps-old'))(),
            new (require('enb/techs/files'))(),
            new (require('bh/techs/bh-server'))(),
            new (require('enb/techs/html-from-bemjson'))(),
            new (require('enb/techs/js'))(),
            new (require('enb/techs/css-stylus'))()
        ]);
        nodeConfig.addTargets([
            '?.html', '_?.js', '_?.css'
        ]);
    });

    config.mode('development', function() {
        config.nodeMask(/pages\-desktop\/.*/, function(nodeConfig) {
            nodeConfig.addTechs([
                new (require('enb/techs/file-copy'))({ sourceTarget: '?.js', destTarget: '_?.js' }),
                new (require('enb/techs/file-copy'))({ sourceTarget: '?.css', destTarget: '_?.css' })
            ]);
        });
    });

    config.mode('production', function() {
        config.nodeMask(/pages\-desktop\/.*/, function(nodeConfig) {
            nodeConfig.addTechs([
                new (require('enb/techs/borschik'))({ sourceTarget: '?.js', destTarget: '_?.js' }),
                new (require('enb/techs/borschik'))({ sourceTarget: '?.css', destTarget: '_?.css' })
            ]);
        });
    });
};

function getLevels(config) {
    return [
        'blocks-core'
    ].map(function(level) {
        return config.resolvePath(level);
    });
}