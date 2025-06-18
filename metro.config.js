const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.blacklistRE = [/^.*\/android\/.*$/, /^.*\/node_modules\/.*$/];

module.exports = config; 