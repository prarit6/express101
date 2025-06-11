import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import usersModel from "../models/userModel.js";

const options = { //แนบ token ไว้ที่ header
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const users = await usersModel.findById(jwt_payload.id); //check id ที่ req มาว่าตรงใน db
      if (users) return done(null, users);
      else return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
