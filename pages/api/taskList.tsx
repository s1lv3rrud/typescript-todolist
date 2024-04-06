import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await fetch("http://15.164.18.158:8000/task/list", {
      headers: {},
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the tasks.");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}
