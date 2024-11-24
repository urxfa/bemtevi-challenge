import { Op } from 'sequelize'

import Insurer from "../models/Insurer.ts";
import type { InsurerAttributes } from "../models/Insurer.ts";
import { appendTrailingSlash } from 'hono/trailing-slash';

export const createInsurer = async (insurerData: InsurerAttributes) => {
  const existingInsurer = await Insurer.findOne({
    where: {
      [Op.or]: [
        { cnpj: insurerData.cnpj },
        { email: insurerData.email },
      ],
    },
  });

  if (existingInsurer)
    throw new Error('CNPJ or Company email already in use.')

  const newInsurer = await Insurer.create(insurerData);

  const { password, ...insurerWithoutPassword } = newInsurer.toJSON()
  return insurerWithoutPassword;
};

export const updateInsurerInfo = async (uid: string, insurerData: Partial<InsurerAttributes>) => {
  const insurer = await Insurer.findOne({ where: { uid } });

  if (!insurer)
    throw new Error("Error not found!")

  await Insurer.update(
    { ...insurerData },
    { where: { uid } }
  );

  return true;
};

export const getInsurerByUid = async (uid: string) => {
  const insurer = await Insurer.findOne({ where: { uid } })
  console.log(insurer)
  if (!insurer)
    throw new Error("Insurer Not Found")

  const { password, ...insurerWithoutPassword } = insurer.toJSON()
  return insurerWithoutPassword;
};

