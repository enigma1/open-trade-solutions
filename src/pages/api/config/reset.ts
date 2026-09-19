import { resetConfigCache } from ">/lib/server/config";

export const POST = async () => {
  resetConfigCache();
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
