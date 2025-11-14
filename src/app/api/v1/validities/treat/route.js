import { cookies } from "next/headers";
import { UploadTable } from "@/components/models/xlsxHandler.model";

export async function POST(request) {
  try {
    const products = await request.json();
    return Response.json([
      {
        status: 200,
      },
    ]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
