import { Router } from "express";
import { FuelModel } from "../models/fuel.model.js";
import handler from "express-async-handler";

const router = Router();

router.get(
  "/",
  handler(async (req, res) => {
    const fuels = await FuelModel.find({});
    res.send(fuels);
  })
);

router.get(
  "/tags",
  handler(async (req, res) => {
    const tags = await FuelModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await FuelModel.countDocuments(),
    };

    tags.unshift(all);

    res.send(tags);
  })
);

router.get(
  "/search/:searchTerm",
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, "i");

    const fuels = await FuelModel.find({ name: { $regex: searchRegex } });
    res.send(fuels);
  })
);

router.get(
  "/tag/:tag",
  handler(async (req, res) => {
    const { tag } = req.params;
    const fuels = await FuelModel.find({ tags: tag });
    res.send(fuels);
  })
);

router.get(
  "/:fuelId",
  handler(async (req, res) => {
    const { fuelId } = req.params;
    const fuel = await FuelModel.findById(fuelId);
    res.send(fuel);
  })
);

export default router;
