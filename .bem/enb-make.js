module.exports = function(config) {
    config.node('desktop.pages/index');

    config.nodeMask(/desktop\.pages\/.*/, function(nodeConfig) {
        nodeConfig.addTechs([
            new (require('enb/techs/file-provider'))({ target: '?.bemjson.js' }),
            new (require('enb/techs/bemdecl-from-bemjson'))(),
            new (require('enb/techs/levels'))({ levels: getLevels(config) }),
            new (require('enb/techs/deps-old'))(),
            new (require('enb/techs/files'))(),
            new (require('./techs/html'))(),
            new (require('enb/techs/js'))(),
            new (require('enb/techs/css-stylus'))()
        ]);
        nodeConfig.addTargets([
            '?.html', '_?.js', '_?.css'
        ]);
    });

    config.mode('development', function() {
        config.nodeMask(/desktop\.pages\/.*/, function(nodeConfig) {
            nodeConfig.addTechs([
                new (require('enb/techs/file-copy'))({ sourceTarget: '?.js', destTarget: '_?.js' }),
                new (require('enb/techs/file-copy'))({ sourceTarget: '?.css', destTarget: '_?.css' })
            ]);
        });
    });
    config.mode('production', function() {
        config.nodeMask(/desktop\.pages\/.*/, function(nodeConfig) {
            nodeConfig.addTechs([
                new (require('enb/techs/borschik'))({ sourceTarget: '?.js', destTarget: '_?.js' }),
                new (require('enb/techs/borschik'))({ sourceTarget: '?.css', destTarget: '_?.css' })
            ]);
        });
    });
};

function getLevels(config) {
    return [
        'core.blocks'
    ].map(function(level) {
        return config.resolvePath(level);
    });
}