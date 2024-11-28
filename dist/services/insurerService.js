import { Op } from 'sequelize';
import Insurer from "../models/Insurer";
import InsuranceType from '../models/InsuranceType';
export const createInsurer = async (insurerData) => {
    const existingInsurer = await Insurer.findOne({
        where: {
            [Op.or]: [
                { cnpj: insurerData.cnpj },
                { email: insurerData.email },
            ],
        },
    });
    if (existingInsurer)
        throw new Error('CNPJ or Company email already in use.');
    const newInsurer = await Insurer.create(insurerData);
    const { password, ...insurerWithoutPassword } = newInsurer.toJSON();
    return insurerWithoutPassword;
};
export const updateInsurerInfo = async (uid, insurerData) => {
    const insurer = await Insurer.findOne({ where: { uid } });
    if (!insurer)
        throw new Error("Error not found!");
    await Insurer.update({ ...insurerData }, { where: { uid } });
    return true;
};
export const getInsurerByUid = async (uid) => {
    const insurer = await Insurer.findOne({ where: { uid } });
    if (!insurer)
        throw new Error("Insurer Not Found");
    const { password, ...insurerWithoutPassword } = insurer.toJSON();
    return insurerWithoutPassword;
};
export const createInsurance = async (insurerUid, insuranceData) => {
    const insurer = await Insurer.findOne({ where: { uid: insurerUid } });
    if (!insurer)
        throw new Error("Insurer Not Found");
    console.log("Criando nosso seguro: ", insuranceData);
    const insurance = await InsuranceType.create({
        ...insuranceData,
        insurerUid: insurer.get('uid'),
    });
    return insurance.toJSON();
};
export const getAllInsurances = async (insurerUid, page = 1, pageSize = 10) => {
    const offset = (page - 1) * pageSize;
    const { count, rows } = await InsuranceType.findAndCountAll({ where: { insurerUid }, limit: pageSize, offset: offset });
    const totalPages = Math.ceil(count / pageSize);
    return { totalPages, currentPage: page, pageSize: 10, totalItems: count, data: rows };
};
