import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
