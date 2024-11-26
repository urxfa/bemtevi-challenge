
import InsuranceType from "../models/InsuranceType.ts";
import Insurer from "../models/Insurer.ts";
import User from "../models/User.ts";

import { getAllInsurances } from "./insurerService.ts";

export const getDashboard = async (uid: string, isInsurer: boolean) => {
  const entity = isInsurer ? await Insurer.findOne({ where: { uid } }) : await User.findOne({ where: { uid } });

  if (!entity)
    throw new Error("Entity not found");

  // Show all Insurances available
  if (!isInsurer) {
    const insurers = await Insurer.findAll({ include: { model: InsuranceType }, attributes: ['uid', 'company_name', 'cnpj', 'address', 'phone'] });
    console.log(insurers);
    return { availableInsurers: insurers };
  }

  const insurances = await getAllInsurances(uid);
  return insurances;
};