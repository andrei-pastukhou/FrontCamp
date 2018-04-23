import {config} from '../../config/config.js';

const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

/**
 * Normalize a port into a number, string, or false.
 */
export function normalizePort(val) {
    return parseInt(val, 10);
};

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secretKey
};

export const JWTpassportCallback = () => {
    return   new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({id: jwt_payload.sub}, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    })
};
