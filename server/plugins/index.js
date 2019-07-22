'use strict';

const path = require('path');

const plugins = [
    {
        plugin: require('hapi-i18n'),
        options: {
            locales: ['en', 'es', 'fr'],
            directory: __dirname + '/locales',
            languageHeaderField: 'accept-language'
        }
    }
];

module.exports = plugins;
