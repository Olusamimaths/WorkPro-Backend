import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
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

const User = mongoose.model("User", UserSchema);

export default User;
