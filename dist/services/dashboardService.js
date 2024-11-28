import InsuranceType from "../models/InsuranceType";
import Insurer from "../models/Insurer";
import User from "../models/User";
import { getAllInsurances } from "./insurerService";
export const getDashboard = async (uid, isInsurer) => {
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
