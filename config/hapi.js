'use strict';

const Boom = require('boom');

const portString = '4321';
const port = parseInt(portString, 10);


const config = {
    options: {
        address: '0.0.0.0',
        port,
        routes: {
            validate: {
                failAction: async (request, h, err) => {

                    request.logger.error(err);
                    if (process.env.NODE_ENV === 'production') {
                        throw Boom.badRequest('Invalid request payload input');
                    }
                    else {
                        throw err;
                    }

                }
            }
        }
    }
};

module.exports = config;
