require("dotenv").config({ quiet: true });

const { signUp } = require("../../../app/ui/models/auth/signUp/signUpFunction");
const { signIn } = require("../../../app/ui/models/auth/signIn/signInFunction");
const { signOut } = require("../../../app/ui/models/auth/signOut/signOutFunction");
const { deleteUser } = require("../../../app/ui/models/auth/deleteUser/deleteUserFunction");
const { getSession } = require("../../../app/ui/models/auth/getSession/getSessionFunction");
const { getUser } = require("../../../app/ui/models/auth/getUser/getUserFunction");
const { editUser } = require("../../../app/ui/models/auth/editUser/editUserFunction");

const adminUser = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
};
const normalUser = {
  name: "Teste Auth",
  username: "teste.auth",
  access_level: 1,
  branch_id: 1,
  password: "testeauth",
  winthor_id: 1,
};
const editedUser = {
  name: "Teste Edit",
  username: "teste.edit",
  access_level: 1,
  branch_id: 2,
  password: "testeedit",
  winthor_id: 3,
};

// SignUp Tests
test("SignUp", async () => {
  // SignUp WithValid Credentials
  const admin = await signIn(adminUser);
  const { response } = await signUp(normalUser, admin.result.token);
  expect(response.status).toBe(201);

  // SignUp with existing credentials
  const secResponse = await signUp(normalUser, admin.result.token);
  expect(secResponse.response.status).toBe(409);
  signOut(admin.result.token);
});

// SignIn Tests
let id;
test("SignIn", async () => {
  // SignIn with valid credentials
  const { response, result } = await signIn(normalUser);
  const userInfos = await getSession(result.token);
  id = userInfos.result.id;
  expect(response.status).toBe(200);

  // SignIn with invalid username
  const invalidUserSignIn = await signIn({ username: "auth.teste", password: "testeauth" });
  expect(invalidUserSignIn.result.message).toEqual("Usuário ou senha inválidos!");

  // SignIn with invalid password
  const invalidPasswordSignIn = await signIn({ username: "teste.auth", password: "authteste" });
  expect(invalidPasswordSignIn.result.message).toEqual("Usuário ou senha inválidos!");
});

// GetUser
test("GetUser", async () => {
  const admin = await signIn(adminUser);
  const { response } = await getUser(id, admin.result.token);
  signOut(admin.result.token);
  expect(response.status).toBe(200);
});

// GetSession
test("GetSession", async () => {
  const userInfos = await signIn(normalUser);
  const { response } = await getSession(userInfos.result.token);
  signOut(userInfos.result.token);
  expect(response.status).toBe(200);
});

test("SignOut", async () => {
  const userInfos = await signIn(normalUser);
  const { response } = await signOut(userInfos.result.token);
  expect(response.status).toBe(200);
});

// Edit User Test
test("EditUser", async () => {
  const admin = await signIn(adminUser);
  const { response } = await editUser(id, admin.result.token, editedUser);
  signOut(admin.result.token);
  expect(response.status).toBe(200);
});

// Delete User Test
test("Delete", async () => {
  const admin = await signIn(adminUser);
  const { response } = await deleteUser(id, admin.result.token);
  signOut(admin.result.token);
  expect(response.status).toBe(200);
});
