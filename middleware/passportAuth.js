import passport from "../config/passport-jwt.js"

const passportAuthMiddleware = passport.authenticate("jwt", {session: false});

export default passportAuthMiddleware;