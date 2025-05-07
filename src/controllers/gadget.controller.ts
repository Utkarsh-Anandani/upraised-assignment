import { Request, Response } from 'express';
import * as gadgetService from '../services/gadget.service';

export const addGadget = async (req: Request, res: Response) => {
  try {
    const result = await gadgetService.addAGadget(req.user);
    res.status(201).json(result);
  } catch (error) {
    console.error("Adding Gadget Error:", error);
    res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getGadgets = async (req: Request, res: Response) => {
  try {
    const result = await gadgetService.getAllGadgets(req.user, req.query.status);
    res.status(200).json(result);
  } catch (error) {
    console.error("Getting Gadget Error:", error);
    res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const updateGadget = async (req: Request, res: Response) => {
  try {
    const result = await gadgetService.updateGadget(req.user, req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Updating Gadget Error:", error);
    res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
}

export const deleteGadget = async (req: Request, res: Response) => {
  try {
    const result = await gadgetService.deleteGadget(req.user, req.query.gadgetId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Delete Gadget Error:", error);
    res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const selfDestruct = async (req: Request, res: Response) => {
  try {
    const result = await gadgetService.selfDestruct(req.user, req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Destroying Gadget Error:", error);
    res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
}