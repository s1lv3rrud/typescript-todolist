import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Request Method: ", req.method);
  if (req.method === "DELETE") {
    try {
      console.log("Delete Task: ", req.query);
      const { id } = req.query;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/task/${id}`,
        {
          method: "DELETE",
          headers: {
            Cookie: req.headers.cookie ?? "",
          },
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
  } else if (req.method === "PATCH") {
    try {
      console.log("Modify Task: ", req.query);
      const { id } = req.query;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/task/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: req.headers.cookie ?? "",
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
  }
}
