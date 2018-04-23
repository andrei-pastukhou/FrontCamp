const config = {
    mongodb: {
        connectionUrl: 'mongodb://127.0.0.1/blog',
        options: {
            useMongoClient: true
        }
    },
    expressSession: {
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    },
    jwt: {
        secretKey: 'secret'
    },
    corsOPtions:  {
        origin: '*',
        methods: 'GET,PUT,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 200
    }
};

export {config};
