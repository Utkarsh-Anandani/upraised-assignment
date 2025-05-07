import { Router } from "express";
import {
  addGadget,
  deleteGadget,
  getGadgets,
  selfDestruct,
  updateGadget,
} from "../controllers/gadget.controller";
import { authenticateUser } from "../middlewares/auth";

const router = Router();

// Route to add a Gadget to inventory
router.post("/", authenticateUser, addGadget);

// Route to get all gadgets with their success probabilities
router.get("/", authenticateUser, getGadgets);

// Route to update/modify an existing gadget
router.patch("/", authenticateUser, updateGadget);

// Route to delete/decommission a gadget
router.delete("/", authenticateUser, deleteGadget);

// Code protected route to enable self-destruct for a gadget
router.post("/:id/self-destruct", authenticateUser, selfDestruct);

export default router;
