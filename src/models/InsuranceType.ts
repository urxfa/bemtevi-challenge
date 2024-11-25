import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.ts';
import Insurer from './Insurer.ts';

export interface InsuranceTypeAttributes {
  id: number;
  insurerUid: string;
  name: string;
  description: string;
  type: string;

  coverage: string; // informações sobre o que está coberto (ex: "Cobertura total contra roubo e danos")
  priceRange: number; // faixa de preço do seguro (ex: "R$500 a R$1000 por ano")
  conditions: string; // condições especiais do seguro (ex: "exclusivo para carros de até 10 anos")
}

class InsuranceType extends Model<InsuranceTypeAttributes> {
  public id!: number;
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

  },
  {
    sequelize, tableName: 'insurance_type', timestamps: true
  });



export default InsuranceType;