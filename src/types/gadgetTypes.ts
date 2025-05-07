import { GadgetStatus } from "../generated/prisma";

export interface updateGadgetDto {
  name: string;
  status: GadgetStatus;
  gadgetId: string;
}

export const gadgetStatusList = [
  "Available",
  "Deployed",
  "Destroyed",
  "Decommissioned",
];
