const jwtStrategy = require("passport-jwt").Strategy,
      ExtractJwt = require("passport-jwt").ExtractJwt,
      User      = require("../models/user"),
      keys      = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey;

module.exports = passport => {
    passport.use(
        new jwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
            .then(user => {
                if(user) {
                    return done(null, {id:user._id, isAdmin:user.isAdmin});
                }
                return done(null, false);
            })
            .catch(err => {
                return done(null, false);
            })
        })
    )
}
