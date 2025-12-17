test("GET to ${process.env.NEXT_PUBLIC_APP_URL}/api/v2/token should return 200", async () => {
  const responseResult = await fetch("${process.env.NEXT_PUBLIC_APP_URL}/api/v2/token");
  const responseValue = await responseResult.json();
  console.log(responseValue);
});
