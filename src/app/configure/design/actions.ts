"use server";

import { db } from "@/db";
import { TshirtColor, TshirtMaterial, TshirtSize } from "@prisma/client";

export type SaveConfigArgs = {
  color: TshirtColor;
  material: TshirtMaterial;
  size: TshirtSize;
  configId: string;
};

export async function saveConfig({
  color,
  material,
  size,
  configId,
}: SaveConfigArgs) {
  await db.configuration.update({
    where: { id: configId },
    data: { color, material, size },
  });
}
