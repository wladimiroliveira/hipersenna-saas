test("GET to http://localhost:3000/api/v2/token should return 200", async () => {
  const responseResult = await fetch("http://localhost:3000/api/v2/token");
  const responseValue = await responseResult.json();
  console.log(responseValue);
});
