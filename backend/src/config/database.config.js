import { connect, set } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { FuelModel } from "../models/fuel.model.js";
import { sample_users } from "../data.js";
import { sample_fuels } from "../data.js";
import bcrypt from "bcryptjs";
const PASSWORD_HASH_SALT_ROUNDS = 10;
set("strictQuery", true);

export const dbconnect = async () => {
  try {
    connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await seedUsers();
    await seedFuels();
    console.log("connect successfully---");
  } catch (error) {
    console.log(error);
  }
};

async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log("Users seed is already done!");
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }

  console.log("Users seed is done!");
}

async function seedFuels() {
  const fuels = await FuelModel.countDocuments();
  if (fuels > 0) {
    console.log("Fuels seed is already done!");
    return;
  }

  for (const fuel of sample_fuels) {
    fuel.imageUrl = `/fuels/${fuel.imageUrl}`;
    await FuelModel.create(fuel);
  }

  console.log("Fuels seed Is Done!");
}
