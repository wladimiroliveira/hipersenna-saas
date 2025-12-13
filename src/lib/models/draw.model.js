export async function drawRaffles(branch_id) {
  try {
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/raffles/draw/${branch_id}`);
    const responseValue = await responseResult.json();
    return {
      ok: responseResult.ok,
      status: responseResult.status,
      ...responseValue,
    };
  } catch (err) {
    console.error(err);
  }
}
