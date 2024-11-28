import bcrypt from 'bcrypt';

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface UserAttributes {
  uid: string;
  name: string;
  cpf: string;
  email: string;
  sex: 'M' | 'F';
  score: number;
  password: string;
  address: string;
  phone: string;
  dateOfBirth: Date;
}

class User extends Model<UserAttributes> {
  public uid!: string;
  public name!: string;
  public cpf!: string;
  public email!: string;
  public sex!: 'M' | 'F';
  public score!: number;
  public password!: string;
  public dateOfBirth!: Date;
  public address!: string;
  public phone!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [11, 11],
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
    sex: {
      type: DataTypes.ENUM('M', 'F'),
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
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
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true
  },
);

User.beforeCreate(async (user) => {
  if (user.get('password')) {
    const salt = await bcrypt.genSalt(10);
    user.set('password', await bcrypt.hash(user.get('password'), salt));
  }
});


User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    user.set('password', await bcrypt.hash(user.get('password'), salt));
  }
});

export default User;