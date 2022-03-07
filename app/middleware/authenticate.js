require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Users = require('../auth/model.js');
module.exports = function(passport){
    const opts = {
        secretOrKey: process.env.SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };
    passport.use(new JwtStrategy(opts, async function(jwt_payload, next) {
        await Users.findOne({email: jwt_payload.email}, function(err, user){
            if (err){
                return next(err, false);
            }
            if(user){
                next(null, user);
            } else {
                 next(null, false);
            }
        })
    }))
};