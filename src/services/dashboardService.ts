
import InsuranceType from "../models/InsuranceType.ts";
import Insurer from "../models/Insurer.ts";
import User from "../models/User.ts";

import { getAllInsurances } from "./insurerService.ts";

export const getDashboard = async (uid: string, isInsurer: boolean) => {
  const entity = isInsurer ? await Insurer.findOne({ where: { uid } }) : await User.findOne({ where: { uid } });

  if (!entity)
    throw new Error("Entity not found");

  if (!isInsurer) {
    const insurances = await InsuranceType.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']],
    });
    return { insurances: insurances };
  }

  const insurances = await getAllInsurances(uid);
  return insurances;
};