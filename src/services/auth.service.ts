import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import { PrismaClient } from '@prisma/client';
import { authPayload } from '../types/authTypes';

const prisma = new PrismaClient();

export const registerUser = async ({ email, password }: authPayload) => {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if(existingUser && existingUser.email) throw new Error("User already exists!!");

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashed } });
    const { password: _removed, ...safeUser } = user;
    return {
      status: true,
      message: "User registered successfully!!",
      data: safeUser
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const loginUser = async ({ email, password }: authPayload) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
  
    const token = generateToken({ id: user.id, email: user.email });

    const { password: _removed, ...safeUser } = user;
    return {
      status: true,
      message: "User Login successfully!!",
      data: safeUser,
      token
    };
  } catch (error) {
    throw new Error(error);
  }
};
