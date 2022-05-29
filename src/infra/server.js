const Hapi = require('@hapi/hapi');
const routes = require('../implementation/route/routing');

const initServer = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 5000,
        routes: {
            cors : {
                origin: ['*'],
            }
        }
    });
    server.route(routes);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

initServer();



