// import * as AccountRepo from "../account/account.repository.js";

// export default async () => {
//   const username = "username";
//   const email = "email@email.com";
//   const password = "password";

//   // fetch all accounts
//   console.log("[1] All accounts:\n", await AccountRepo.fetchAllAccounts());

//   // account exists
//   const targetAccount = await AccountRepo.exists({ username });
//   let accountId;
//   console.log(
//     `[2] Testing if account of username: "${username}" exists:\n`,
//     targetAccount,
//   );

//   // deleting target account if exists
//   if (targetAccount) {
//     accountId = targetAccount._id.toString();
//     console.log(
//       "[3] Deleting target account:\n",
//       await AccountRepo.deleteAccount(accountId),
//     );
//   } else {
//     console.log("[3] Target account not found.");
//   }

//   // create account
//   const createdAccount = await AccountRepo.createAccount({
//     username,
//     email,
//     password,
//   });
//   accountId = createdAccount._id.toString();
//   console.log("[4] Creating account:\n", createdAccount);

//   // fetch account
//   console.log(
//     `[5] Fetching account of username: "${username}":\n`,
//     await AccountRepo.fetchAccountById(createdAccount._id),
//   );

//   // authenticating account
//   console.log(
//     `[6] Authenticating account of username: "${username}:\n`,
//     await AccountRepo.authAccountByEmail(email, password),
//   );
// };

import * as AccountRepo from "../account/account.repository.js";
import util from "../util/util.js";


export default async () => {
  const username = "username",
    email = "email@email.com",
    password = "password";
  await util.Test.conductTest(1, "Fetching All Accounts", AccountRepo.fetchAllAccounts);
  await util.Test.conductTest(2, "Creating account", () =>
    AccountRepo.createAccount({ username, email, password }),
  );
  const result = await util.Test.conductTest(3, "Account Exists", () =>
    AccountRepo.exists({ username }),
  );
  await util.Test.conductTest(4, "Fetching Accounts", () =>
    AccountRepo.fetchAccountById(result._id.toString()),
  );
  await util.Test.conductTest(5, "Deleting Account", () =>
    AccountRepo.deleteAccount(result._id.toString()),
  );
};
