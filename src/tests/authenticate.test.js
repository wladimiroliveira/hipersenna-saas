const signUp = require("../ui/components/signUp/signUpFunction");
const signIn = require("../ui/components/signIn/signInFunction");
const signOut = require("../ui/components/signOut/signOutFunction");
const deleteUser = require("../ui/components/deleteUser/deleteUserFunction");

let token;
let userId;

// SignUp Tests
test("Registering a new user", async () => {
  const { response, result } = await signUp.signUp("Teste Auth", "teste.auth", 1, 1, "testeauth", 1);
  expect(response.status).toBe(201);
});

test("Registration with existing credentials", async () => {
  const { response, result } = await signUp.signUp("Teste Auth", "teste.auth", 1, 1, "testeauth", 1);

  expect(response.status).toBe(409);
});

// SignIn Tests
test("SignIn with valid credentials", async () => {
  const { response, result } = await signIn.signIn("teste.auth", "testeauth");
  token = result.token;
  userId = result.id;
  expect(response.status).toBe(200);
});

test("SignIn with invalid username", async () => {
  const { response, result } = await signIn.signIn("auth.teste", "testeauth");
  expect(result.message).toEqual("Usuário ou senha inválidos!");
});

test("SignIn with invalid password", async () => {
  const { response, result } = await signIn.signIn("teste.auth", "authteste");
  expect(result.message).toEqual("Usuário ou senha inválidos!");
});

// SignOut Tests
test("SignOut without token", async () => {
  const { response, result } = await signOut.signOut();
  expect(response.status).toBe(401);
});

test("SignOut with valid token", async () => {
  const { response, result } = await signOut.signOut(token);
  expect(response.status).toBe(200);
});

/* test("SignOut without session", async () => {
  const { response, result } = await signOut.signOut(token);
  expect(result.message).toEqual("Sessão não encontrada ou já expirada");
}); */

// Delete User Test

test("Delete user with valid id", async () => {
  const content = await signIn.signIn("teste.auth", "testeauth");
  token = content.result.token;
  const { response, result } = await deleteUser.deleteUser(userId, token);
  expect(response.status).toBe(200);
});
