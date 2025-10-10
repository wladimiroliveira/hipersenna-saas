const { signUp } = require("../../../ui/models/auth/signUp/signUpFunction");
const { signIn } = require("../../../ui/models/auth/signIn/signInFunction");
const { signOut } = require("../../../ui/models/auth/signOut/signOutFunction");
const { deleteUser } = require("../../../ui/models/auth/deleteUser/deleteUserFunction");
const { getSession } = require("../../../ui/models/auth/getSession/getSessionFunction");
const { getUser } = require("../../../ui/models/auth/getUser/getUserFunction");
const { editUser } = require("../../../ui/models/auth/editUser/editUserFunction");

const adminUser = {
  username: process.env.ADMIN_USER_USERNAME,
  password: process.env.ADMIN_USER_PASSWORD,
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
test("Registering a new user", async () => {
  const admin = await signIn(adminUser);
  const { response, result } = await signUp(normalUser, admin.result.token);
  signOut(admin.result.token);
  expect(response.status).toBe(201);
});

test("Registration with existing credentials", async () => {
  const admin = await signIn(adminUser);
  const { response, result } = await signUp(normalUser, admin.result.token);
  signOut(admin.result.token);
  expect(response.status).toBe(409);
});

// SignIn Tests
let id;
test("SignIn with valid credentials", async () => {
  const { response, result } = await signIn(normalUser);
  const userInfos = await getSession(result.token);
  id = userInfos.result.id;
  expect(response.status).toBe(200);
});

test("SignIn with invalid username", async () => {
  const { response, result } = await signIn({ username: "auth.teste", password: "testeauth" });
  expect(result.message).toEqual("Usuário ou senha inválidos!");
});

test("SignIn with invalid password", async () => {
  const { response, result } = await signIn({ username: "teste.auth", password: "authteste" });
  expect(result.message).toEqual("Usuário ou senha inválidos!");
});

// GetUser
test("GetUser with valid id", async () => {
  const admin = await signIn(adminUser);
  const { response, result } = await getUser(id, admin.result.token);
  signOut(admin.result.token);
  expect(response.status).toBe(200);
});

// GetSession
test("GetSession with valid token", async () => {
  const userInfos = await signIn(normalUser);
  const { response, result } = await getSession(userInfos.result.token);
  signOut(userInfos.result.token);
  expect(response.status).toBe(200);
});

// SignOut Tests
test("SignOut without token", async () => {
  const { response, result } = await signOut();
  expect(response.status).toBe(401);
});

test("SignOut with valid token", async () => {
  const userInfos = await signIn(normalUser);
  const { response, result } = await signOut(userInfos.result.token);
  expect(response.status).toBe(200);
});

// Edit User Test
test("EditUser with all options", async () => {
  const admin = await signIn(adminUser);
  const { response, result } = await editUser(id, admin.result.token, editedUser);
  signOut(admin.result.token);
  expect(response.status).toBe(200);
});

// Delete User Test
test("Delete user with valid id", async () => {
  const admin = await signIn(adminUser);
  const { response, result } = await deleteUser(id, admin.result.token);
  signOut(admin.result.token);
  expect(response.status).toBe(200);
});
