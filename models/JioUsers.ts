import mongoose from "mongoose";

export interface JioUsers extends mongoose.Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobile: number;
  dob: Date;
  gender: string;
  state: string;
  degree: string;
  college: string;
  disability: string;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<JioUsers>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
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
  dob: {
    type: Date,
  },
  gender: {
    type: String,
  },
  state: {
    type: String,
  },
  degree: {
    type: String,
  },
  college: {
    type: String,
  },
  disability: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

export default mongoose.models.JioUsers ||
  mongoose.model<JioUsers>("JioUsers", UserSchema);
