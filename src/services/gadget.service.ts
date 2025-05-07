import { PrismaClient } from "../generated/prisma/client";
import { jwtPayload } from "../types/authTypes";
import { gadgetStatusList, updateGadgetDto } from "../types/gadgetTypes";

const prisma = new PrismaClient();

function generateCodename(): string {
  const adjectives = ["Silent", "Fierce", "Mighty", "Ghost", "Iron", "Wild"];
  const nouns = ["Tiger", "Phoenix", "Dragon", "Falcon", "Whale", "Wolf"];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}

export const addAGadget = async (user: jwtPayload) => {
  const id = user.id;
  if (!id) throw new Error("Invalid Session");
  try {
    const codename = generateCodename();
    const gadget = await prisma.gadget.create({
      data: {
        name: codename,
        userId: id,
        status: "Available",
      },
    });
    if (!gadget) throw new Error("Gadget creation Failed");
    return {
      message: "Gadget created successfully!!",
      status: true,
      data: gadget
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllGadgets = async (user: jwtPayload, status: any) => {
  const id = user.id;
  if (!id) throw new Error("Invalid Session");
  try {
    const query: any = {};
    if (gadgetStatusList.includes(status)) {
      query.status = status;
    }

    const gadgets = await prisma.gadget.findMany({
      where: query,
    });

    if (!gadgets) throw new Error("Gadget search Failed");
    const data = gadgets.map((gadget) => ({
      ...gadget,
      missionSuccessProbability: `${Math.floor(Math.random() * 101)}%`,
    }));
    return {
      message: "Gadget got successfully!!",
      status: true,
      data: data,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const updateGadget = async (user: jwtPayload, data: updateGadgetDto) => {
  const id = user.id;
  if (!id) throw new Error("Invalid Session");
  try {
    const { name, status, gadgetId } = data;
    const gadget = await prisma.gadget.findUnique({
      where: {
        id: gadgetId,
      },
    });

    if (gadget.userId !== id) {
      throw new Error("You're not worthy enough to be owner!!");
    }

    const updatedGadget = await prisma.gadget.update({
      where: {
        id: gadgetId,
      },
      data: {
        name,
        status,
      },
    });

    if (!updatedGadget) throw new Error("Gadget updation Failed");
    return {
      message: "Gadget updated successfully!!",
      status: true,
      data: updatedGadget,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteGadget = async (user: jwtPayload, gadgetId: any) => {
  const id = user.id;
  if (!id) throw new Error("Invalid Session");
  try {
    const gadget = await prisma.gadget.findUnique({
      where: {
        id: gadgetId,
      },
    });

    if (gadget.userId !== id) {
      throw new Error("You're not worthy enough to be owner!!");
    }

    const deletedGadget = await prisma.gadget.update({
      where: {
        id: gadgetId,
      },
      data: {
        status: "Decommissioned",
      },
    });

    if (!deletedGadget) throw new Error("Gadget deletion Failed");
    return {
      message: "Gadget deleted successfully!!",
      status: true,
      data: deletedGadget,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const selfDestruct = async (
  user: jwtPayload,
  gadgetId: any,
  data: { code: string }
) => {
  const id = user.id;
  if (!id) throw new Error("Invalid Session");
  try {
    if (!data.code) {
      throw new Error("Wrong confirmation code!!");
    }

    const gadget = await prisma.gadget.findUnique({
      where: {
        id: gadgetId,
      },
    });

    if (gadget.userId !== id) {
      throw new Error("You're not worthy enough to be owner!!");
    }

    const deletedGadget = await prisma.gadget.update({
      where: {
        id: gadgetId,
      },
      data: {
        status: "Destroyed",
      },
    });

    if (!deletedGadget) throw new Error("Self Destruction Failed");
    return {
      message: "Gadget Destroyed!!",
      status: true,
      data: deletedGadget,
    };
  } catch (error) {
    throw new Error(error);
  }
};
