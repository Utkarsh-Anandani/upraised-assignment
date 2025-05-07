import { GadgetStatus } from "@prisma/client";

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
