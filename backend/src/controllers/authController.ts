import { Request, Response } from "express";
import { generateJWT } from "@/utils/auth";
import bcrypt from "bcryptjs";

import db from "@/utils/db";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    // check if user exists
    if (!user) {
      throw new Error("User does not exist");
    }

    console.log({ password, dbpass: user.password });

    // check if password matches using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    // generate token
    const token = generateJWT({
      id: user.id,
    });

    return res
      .status(200)
      .json({ message: "Login successful", data: { user, token } });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to login", error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // generate token
    const token = generateJWT({
      //
      id: user.id,
    });

    return res
      .status(201)
      .json({ message: "User created", data: { user, token } });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to create user", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  res.send("delete user");
};

export const updateUser = async (req: Request, res: Response) => {
  res.send("update user");
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = generateJWT({
      id: user.id,
    });

    return res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to login", error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  res.send("get users");
};

export const logout = async (req: Request, res: Response) => {
  res.send("logout");
};
