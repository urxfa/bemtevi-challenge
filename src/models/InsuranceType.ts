import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.ts';
import Insurer from './Insurer.ts';

import insurancesTypes from '../types/insuranceTypesTypes.ts'


interface InsuranceTypeAttributes {
  uid: string;
  insurerUid: string;
  name: string;
  description: string;
  type: string;

  coverage: string; // informações sobre o que está coberto (ex: "Cobertura total contra roubo e danos")
  priceRange: number; // faixa de preço do seguro (ex: "R$500 a R$1000 por ano")
  conditions: string; // condições especiais do seguro (ex: "exclusivo para carros de até 10 anos")
}

class InsuranceType extends Model<InsuranceTypeAttributes> {
  public uid!: string;
  public insurerUid!: string;
  public name!: string;
  public description!: string;
  public type!: string;

  public coverage!: string;
  public priceRange!: number;
  public conditions!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InsuranceType.init(
  {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.ENUM(...Object.values(insurancesTypes) as string[]),
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

  },
  {
    sequelize, tableName: 'insurance_type', timestamps: true
  });



export default InsuranceType;