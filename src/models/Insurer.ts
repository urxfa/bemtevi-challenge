import bcrypt from 'bcrypt'

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.ts'

import InsuranceType from './InsuranceType.ts';

export interface InsurerAttributes {
  uid: string;
  company_name: string;
  cnpj: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

class Insurer extends Model<InsurerAttributes> {
  public uid!: string;
  public company_name!: string;
  public cnpj!: string;
  public email!: string;
  public password!: string;
  public address!: string;
  public phone!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Insurer.init(
  {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [14, 14],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    tableName: 'insurers',
    timestamps: true,
  }
);

Insurer.beforeCreate(async (insurer) => {
  if (insurer.get('password')) {
    const salt = await bcrypt.genSalt(10);
    insurer.set('password', await bcrypt.hash(insurer.get('password'), salt))
  }
})

Insurer.beforeUpdate(async (insurer) => {
  if (insurer.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    insurer.set('password', await bcrypt.hash(insurer.get('password'), salt))

  }
})


Insurer.hasMany(InsuranceType, { foreignKey: 'insurerUid', sourceKey: 'uid' });

export default Insurer;