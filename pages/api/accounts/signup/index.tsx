import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/signup/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );
    if (!response.ok) {
      if (response.status === 400) {
        res
          .status(response.status)
          .json({ message: "이미 존재하는 이메일입니다." });
      }
      throw new Error("Failed to forward the request");
    }

    const data = await response.json();
    console.log("Data: ", data);
    res.status(response.status).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}
