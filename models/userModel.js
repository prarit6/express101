import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
  name: { type: String, require: false, default: "", maxlength: 50 },
  email: {
    type: String,
    require: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"]
  },
  password: { type: String, require: true, minlength: 6,},
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("user", userSchema);
