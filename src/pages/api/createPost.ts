import { prisma } from "@/server/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { content } = req.body;

    const newPost = await prisma.post.create({
      data: {
        content,
      },
    });

    res
      .status(200)
      .json({ message: "Post created successfully!", data: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
