import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  firstName: string;
  lastName: string;
  mobile: number;
  email: string;
  degree: string;
  college: string;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<Users>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
  },
  college: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

export default mongoose.models.User ||
  mongoose.model<Users>("User", UserSchema);
