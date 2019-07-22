'use strict';

/* eslint-disable no-console */
(async () => {

    try {
        const server = await require('./server').createServer();
        await server.start();
        console.log(`Server started at: ${server.info.uri}`);
    }
    catch (err) {
        console.log('Failed to start server:', err);
        // Log error and exit
        console.error(err);
        process.exit(1);
    }
})();
/* eslint-enable */
