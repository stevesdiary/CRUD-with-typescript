import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  type: string;
}

const UserSchema = new mongoose.Schema <UserDocument>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  } ,
  password: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

// UserSchema.pre<UserDocument>("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
