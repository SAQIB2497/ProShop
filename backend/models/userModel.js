import mongoose from "mongoos";

const userSchema = new mongoose.userSchema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timeStamp: true,
  }
);

const user = mongoose.model("User", userSchema);

export default user;
