import { Op } from 'sequelize';
import User from '../models/User'
import type { UserAttributes } from '../models/User'

export const createUser = async (userData: UserAttributes) => {
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [
        { cpf: userData.cpf },
        { email: userData.email },
      ],
    },
  });

  if (existingUser)
    throw new Error('CPF or Email already in use.')

  const newUser = await User.create(userData);

  const { password, ...userWithoutPassword } = newUser.toJSON()
  return userWithoutPassword;
}

export const updateUser = async (uid: string, userData: Partial<UserAttributes>) => {
  const user = await User.findOne({
    where: { uid },
  });

  if (!user)
    throw new Error('User not found!')

  await User.update(
    {
      ...userData
    }, { where: { uid } });

  return true;
}

export const deleteUser = async (uid: string) => {
  const user = await User.findOne({ where: { uid } })

  if (!user)
    throw new Error('User not found')

  const deletedUser = await User.destroy({ where: { uid } })
  return true;
}

export const getUserByUid = async (uid: string) => {
  const user = await User.findOne({ where: { uid } })

  if (!user)
    throw new Error("User not found!")

  const { password, ...userWithoutPassword } = user.toJSON()
  return userWithoutPassword;
}
