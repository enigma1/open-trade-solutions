import { resetConfigCache } from '@/lib/server/db/configuration';

export const POST = async () => {
  resetConfigCache();
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
