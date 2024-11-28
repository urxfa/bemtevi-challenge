import bcrypt from 'bcrypt';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import InsuranceType from './InsuranceType';
class Insurer extends Model {
    uid;
    company_name;
    cnpj;
    email;
    password;
    address;
    phone;
    createdAt;
    updatedAt;
}
Insurer.init({
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
}, {
    sequelize,
    tableName: 'insurers',
    timestamps: true,
});
Insurer.beforeCreate(async (insurer) => {
    if (insurer.get('password')) {
        const salt = await bcrypt.genSalt(10);
        insurer.set('password', await bcrypt.hash(insurer.get('password'), salt));
    }
});
Insurer.beforeUpdate(async (insurer) => {
    if (insurer.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        insurer.set('password', await bcrypt.hash(insurer.get('password'), salt));
    }
});
Insurer.hasMany(InsuranceType, { foreignKey: 'insurerUid', sourceKey: 'uid' });
export default Insurer;
