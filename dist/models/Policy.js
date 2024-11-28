import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import InsuranceType from './InsuranceType';
import User from './User';
class Policy extends Model {
    id;
    userUid;
    insuranceTypeUid;
    policyHolderName;
    policyHolderCnpj;
    insuredItemStatus;
    rejectedReason;
    inceptionDate;
    expirationDate;
    createdAt;
    updatedAt;
}
Policy.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userUid: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    insuranceTypeId: {
        type: DataTypes.INTEGER,
        references: {
            model: InsuranceType,
            key: 'id',
        },
        allowNull: false,
    },
    policyHolderName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    policyHolderCnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [14, 14],
        },
    },
    insuredItemStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rejectedReason: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    inceptionDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'policies',
    timestamps: true,
});
Policy.belongsTo(InsuranceType, { foreignKey: 'insuranceTypeId', targetKey: 'id' });
Policy.belongsTo(User, { foreignKey: 'userUid', targetKey: 'uid' });
export default Policy;
