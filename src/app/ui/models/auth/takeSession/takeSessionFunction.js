const { cookies } = require("next/headers");
const { getSession } = require("../getSession/getSessionFunction");

async function TakeSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const result = await getSession(token);
  console.log(result);
}

exports.TakeSession = TakeSession;
