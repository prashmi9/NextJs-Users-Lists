import { customers } from "./data";
export async function GET() {
  return Response.json(customers);
}
