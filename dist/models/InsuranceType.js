import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Insurer from './Insurer';
class InsuranceType extends Model {
    id;
    insurerUid;
    name;
    description;
    type;
    coverage;
    priceRange;
    conditions;
    createdAt;
    updatedAt;
}
InsuranceType.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    insurerUid: {
        type: DataTypes.UUID,
        references: {
            model: Insurer,
            key: 'uid',
        },
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coverage: {
        type: DataTypes.STRING,
    },
    priceRange: {
        type: DataTypes.FLOAT,
    },
    conditions: {
        type: DataTypes.STRING,
    },
}, {
    sequelize, tableName: 'insurance_type', timestamps: true
});
export default InsuranceType;
