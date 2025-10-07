const signIn = require("../../../ui/components/auth/signIn/signInFunction");
const signUp = require("../../../ui/components/auth/signUp/signUpFunction");
const signOut = require("../../../ui/components/auth/signOut/signOutFunction");

const adminUser = {
  username: process.env.ADMIN_USER_USERNAME,
  password: process.env.ADMIN_USER_PASSWORD,
};

const normalUser = {
  name: process.env.NORMAL_USER_NAME,
  username: process.env.NORMAL_USER_USERNAME,
  access_level: process.env.NORMAL_USER_ACCESS_LEVEL,
  branch_id: process.env.NORMAL_USER_BRANCH_ID,
  password: process.env.NORMAL_USER_PASSWORD,
  winthor_id: process.env.NORMAL_USER_WINTHOR_ID,
};

const editedUser = {
  name: process.env.EDITED_USER_NAME,
  username: process.env.EDITED_USER_USERNAME,
  access_level: process.env.EDITED_USER_ACCESS_LEVEL,
  branch_id: process.env.EDITED_USER_BRANCH_ID,
  password: process.env.EDITED_USER_PASSWORD,
  winthor_id: process.env.EDITED_USER_WINTHOR_ID,
};

// SignUp
test("Registering a new user", async () => {
  const admin = await signIn.signIn(adminUser);
  const { response, result } = await signUp.signUp(normalUser, admin.result.token);
  expect(response.status).toBe(201);
  signOut.signOut(admin.result.token);
});

test("Registration with existing credentials", async () => {
  const admin = await signIn.signIn(adminUser);
  const { response, result } = await signUp.signUp(normalUser, admin.result.token);
  expect(response.status).toBe(409);
  signOut.signOut(admin.result.token);
});
