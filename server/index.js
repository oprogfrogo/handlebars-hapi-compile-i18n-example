'use strict';

const {
    options
} = require('../config/hapi');
const Hapi = require('hapi');
const Vision = require('vision');
const Handlebars = require('handlebars');
const Path = require('path');

const createServer = async () => {

    const server = Hapi.Server(options);

    await server.register(Vision);
    await server.register(require('./plugins'));

    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        path: 'views',
        layoutPath: 'views/layout',
        layout: 'default',
        helpersPath: Path.join(__dirname, 'helpers')
    });

    await server.route(require('./routes'));
    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/public/{param*}',
        handler: {
            directory: {
                path: 'server/public'
            }
        }
    });

    return server;
};

module.exports = {
    createServer
};
