const { default: mongoose } = require("mongoose");
import bcrypt from 'bcryptjs';

const restaurantModel = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	address: String,
	city: String,
	contact: String,
});

restaurantModel.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const restaurantSchema = mongoose.models.restaurants || mongoose.model("restaurants", restaurantModel)