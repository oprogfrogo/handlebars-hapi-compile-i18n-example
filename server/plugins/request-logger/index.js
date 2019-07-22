'use strict';

const _ = require('lodash');
const flatten = require('flat');
const attributesRedacted = require('./attributes-redacted.json');

const register = server => {

    server.ext({
        type: 'onPostAuth',
        method: (request, h) => {

            if (!_.isNil(request.payload)) {

                const payloadFlat = flatten(request.payload);
                const payloadRedacted = _.cloneDeep(request.payload);

                Object.keys(payloadFlat).forEach((path) => {

                    const keys = path.split('.');

                    attributesRedacted.forEach(attribute => {

                        if (keys.indexOf(attribute) !== -1) {
                            _.set(payloadRedacted, path, 'REDACTED');
                        }

                    });
                });

                request.logger.info('Request payload', payloadRedacted);
            }

            return h.continue;
        }
    });
};

module.exports = {
    pkg: require('./package.json'),
    register
};
