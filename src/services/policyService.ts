import Insurer from "../models/Insurer";
import Policy from "../models/Policy";
import InsuranceType from "../models/InsuranceType";

import User from "../models/User";


export const createPolicy = async (uid: string, data: any) => {
  const user = await User.findOne({ where: { uid } });
  console.log(uid, data);

  if (!user) throw new Error("User not found");

  const insurance = await InsuranceType.findOne({ where: { id: data.id } })
  if (!insurance) throw new Error("User not found");

  const insurer = await Insurer.findOne({ where: { uid: data.insurerUid } })
  if (!insurer) throw new Error("Insurer not found");
  console.log(insurer);

  const newPolicy = await Policy.create({ userUid: uid, insuranceTypeId: data.id, policyHolderName: data.name, policyHolderCnpj: insurer.get("cnpj"), pending: true });

  return newPolicy;

}
export const getPendingPolicies = async (uid: string, page: number, pageSize: number) => {
  const insurer = await Insurer.findOne({ where: { uid } });
  if (!insurer) throw new Error("Insurer not found!");

  const offset = (page - 1) * pageSize;

  const { count, rows } = await Policy.findAndCountAll({
    where: { pending: true },
    limit: pageSize,
    offset: offset,
    include: [
      {
        model: User,
        attributes: ['uid', 'name', 'email'],
      },
    ],
  });

  return {
    totalCount: count,
    policies: rows,
    totalPages: Math.ceil(count / pageSize),
    currentPage: page,
  };
};

export const getApprovedPolicies = async (uid: string, page: number, pageSize: number) => {
  const user = await User.findOne({ where: { uid } });
  if (!user) throw new Error("User not found");

  const offset = (page - 1) * pageSize;

  const policies = await Policy.findAll({
    where: {
      userUid: uid,
      rejectedReason: null,
      pending: false
    },
    limit: pageSize,
    offset: offset,
    include: [{ model: InsuranceType }],
  });

  return policies;
};



export const approveOrRejectPolicy = async (uid: string, id: number, rejectReason: string | null = null) => {
  const insurer = await Insurer.findOne({ where: { uid } });
  if (!insurer) throw new Error("Insurer not found!");

  const policy = await Policy.findOne({ where: { id } });
  if (!policy) throw new Error("Policy not found!");

  const updateData = {
    rejectedReason: rejectReason,
    pending: false,
  };

  await Policy.update(updateData, { where: { id } });

  return true;
};
