import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

import InsuranceType from './InsuranceType';
import User from './User';

interface PolicyAttributes {
  id: number;
  userUid: string;
  insuranceTypeId: number;
  policyHolderName: string;
  policyHolderCnpj: string;
  rejectedReason: string;
  inceptionDate: Date;
  expirationDate: Date;
  pending: Boolean;
}

class Policy extends Model<PolicyAttributes> {
  public id!: string;
  public userUid!: string;
  public insuranceTypeUid!: string;
  public policyHolderName!: string;
  public policyHolderCnpj!: string;
  public rejectedReason!: string;
  public inceptionDate!: Date;
  public expirationDate!: Date;
  public pending!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Policy.init(
  {
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
    rejectedReason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    inceptionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    pending: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'policies',
    timestamps: true,
  }
);

Policy.belongsTo(InsuranceType, { foreignKey: 'insuranceTypeId', targetKey: 'id' });
Policy.belongsTo(User, { foreignKey: 'userUid', targetKey: 'uid' })

export default Policy;
