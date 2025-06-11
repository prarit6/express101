import passport from "../config/passport-jwt.js"

const passportAuthMiddleware = passport.authenticate("jwt", {session: false}); //ทำการ authen โดยใช้ jwt และไม่แนบ cookies seesion = false

export default passportAuthMiddleware;