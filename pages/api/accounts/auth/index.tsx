import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Request Method: ", req.method);
  if (req.method === "POST") {
    try {
      console.log("Login: ", req.query);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/auth/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to forward the request");
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
  } else if (req.method === "DELETE") {
    try {
      console.log("Logout: ", req.query);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/auth`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to forward the request");
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
}
