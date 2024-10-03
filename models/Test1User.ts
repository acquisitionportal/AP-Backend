import mongoose from "mongoose";

export interface Test1Users extends mongoose.Document {
  name: string;
  mobile: number;
  email: string;
  isPaidUser: boolean;
  isTest2Submitted: boolean;
  createdAt: Date;
}

const Test1UserSchema = new mongoose.Schema<Test1Users>({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isPaidUser: {
    type: Boolean,
    default: false,
  },
  isTest2Submitted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
  },
});

export default mongoose.models.Test1User ||
  mongoose.model<Test1Users>("Test1User", Test1UserSchema);
