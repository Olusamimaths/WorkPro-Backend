import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from '../config/config';

const env = process.env.NODE_ENV || "development";
const { jwtsecret } = config[env];

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  password: String,
  role: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  emailConfirmedAt: Date,
  emailConfirmCode: String,
});

UserSchema.pre("save", function(next){
  this.password = bcrypt.hashSync(this.password);
  next()
});

UserSchema.methods.comparePassword = function(plainPassword) {
  return bcrypt.compareSync(plainPassword, this.password);
}

UserSchema.methods.generateToken = function() {
  return jwt.sign({_id: this._id, username: this.username}, jwtsecret)
}

const User = mongoose.model("User", UserSchema);

export default User;
