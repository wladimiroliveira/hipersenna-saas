// const signUp = require("../ui/components/auth/signUp/signUpFunction");
// const signIn = require("../ui/components/auth/signIn/signInFunction");
// const signOut = require("../ui/components/auth/signOut/signOutFunction");
// const deleteUser = require("../ui/components/auth/deleteUser/deleteUserFunction");
// const getSession = require("../ui/components/auth/getSession/getSessionFunction");
// const editUser = require("../ui/components/auth/editUser/editUserFunction");

// const adminUser = {
//   username: process.env.ADMIN_USERNAME,
//   password: process.env.ADMIN_PASSWORD,
// };
// const normalUser = {
//   name: "Teste Auth",
//   username: "teste.auth",
//   access_level: 1,
//   branch_id: 1,
//   password: "testeauth",
//   winthor_id: 1,
// };
// const editedUser = {
//   name: "Teste Edit",
//   username: "teste.edit",
//   access_level: 1,
//   branch_id: 2,
//   password: "testeedit",
//   winthor_id: 3,
// };

// // SignUp Tests
// // test("Registering a new user", async () => {
// //   const admin = await signIn.signIn(adminUser);
// //   const { response, result } = await signUp.signUp(normalUser, admin.result.token);
// //   expect(response.status).toBe(201);
// //   signOut.signOut(admin.result.token);
// // });

// // test("Registration with existing credentials", async () => {
// //   const admin = await signIn.signIn(adminUser);
// //   const { response, result } = await signUp.signUp(normalUser, admin.result.token);
// //   expect(response.status).toBe(409);
// //   signOut.signOut(admin.result.token);
// // });

// // SignIn Tests
// let id;
// test("SignIn with valid credentials", async () => {
//   const { response, result } = await signIn.signIn(normalUser);
//   const userInfos = await getSession.getSession(result.token);
//   id = userInfos.result.id;
//   expect(response.status).toBe(200);
// });

// test("SignIn with invalid username", async () => {
//   const { response, result } = await signIn.signIn({ username: "auth.teste", password: "testeauth" });
//   expect(result.message).toEqual("Usuário ou senha inválidos!");
// });

// test("SignIn with invalid password", async () => {
//   const { response, result } = await signIn.signIn({ username: "teste.auth", password: "authteste" });
//   expect(result.message).toEqual("Usuário ou senha inválidos!");
// });

// //GetSession
// test("GetSession with valid token", async () => {
//   const userInfos = await signIn.signIn(normalUser);
//   const { response, result } = await getSession.getSession(userInfos.result.token);
//   expect(response.status).toBe(200);
//   signOut.signOut(userInfos.result.token);
// });

// // SignOut Tests
// test("SignOut without token", async () => {
//   const { response, result } = await signOut.signOut();
//   expect(response.status).toBe(401);
// });

// test("SignOut with valid token", async () => {
//   const userInfos = await signIn.signIn(normalUser);
//   const { response, result } = await signOut.signOut(userInfos.result.token);
//   expect(response.status).toBe(200);
// });

// // Edit User Test
// test("EditUser with all options", async () => {
//   const admin = await signIn.signIn(adminUser);
//   const { response, result } = await editUser.editUser(id, admin.result.token, editedUser);
//   expect(response.status).toBe(200);
//   signOut.signOut(admin.result.token);
// });

// // Delete User Test
// test("Delete user with valid id", async () => {
//   const admin = await signIn.signIn(adminUser);
//   const { response, result } = await deleteUser.deleteUser(id, admin.result.token);
//   expect(response.status).toBe(200);
//   signOut.signOut(admin.result.token);
// });
