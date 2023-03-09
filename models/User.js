import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    required: true,
    type: String,
  },
  displayName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  passwordHash: {
    required: true,
    type: String,
  },
  chef: {
    required: true,
    type: Boolean,
  },
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

export default model("User", UserSchema);
