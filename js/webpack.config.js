const config = require('flarum-webpack-config')();

// IDs de módulo por nome, para não colidir com os IDs numéricos de outras extensões.
config.optimization = config.optimization || {};
config.optimization.moduleIds = 'named';
config.optimization.chunkIds = 'named';

module.exports = config;
