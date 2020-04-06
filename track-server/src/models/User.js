const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Joi = require("joi");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre("save", async function(next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const saltRounds = 10;
    var hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .email()
      .min(5)
      .max(255)
      .required(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  };

  return Joi.validate(user, schema);
}

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.validate = validateUser;
