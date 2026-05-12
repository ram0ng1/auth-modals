const config = require('flarum-webpack-config')();

// Use named module IDs to avoid numeric ID collisions with other Flarum extensions.
config.optimization = config.optimization || {};
config.optimization.moduleIds = 'named';
config.optimization.chunkIds = 'named';

module.exports = config;
