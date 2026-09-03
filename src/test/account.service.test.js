import * as AccountService from "../account/account.service.js";

export default async () => {
  const username = "username";
  const email = "email@email.com";
  const password = "password";

  // fetch all accounts
  console.log("[1] All accounts:\n", await AccountService.fetchAllAccounts());

  // account exists
  const targetAccount = await AccountService.exists({ username });
  let accountId;
  console.log(
    `[2] Testing if account of username: "${username}" exists:\n`,
    targetAccount,
  );

  // deleting target account if exists
  if (targetAccount) {
    accountId = targetAccount._id.toString();
    console.log(
      "[3] Deleting target account:\n",
      await AccountService.deleteAccount(accountId),
    );
  } else {
    console.log("[3] Target account not found.");
  }

  // create account
  const createdAccount = await AccountService.createAccount({
    username,
    email,
    password,
  });
  accountId = createdAccount._id.toString();
  console.log("[4] Creating account:\n", createdAccount);

  // fetch account
  console.log(
    `[5] Fetching account of username: "${username}":\n`,
    await AccountService.fetchAccountById(accountId),
  );

  // authenticating account
  console.log(
    `[6] Authenticating account of username: "${accountId}":\n`,
    await AccountService.authAccount(email, password),
  );
};
