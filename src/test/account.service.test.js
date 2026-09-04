// import * as AccountService from "../account/account.service.js";

// export default async () => {
//   const username = "username";
//   const email = "email@email.com";
//   const password = "password";

//   // fetch all accounts
//   console.log("[1] All accounts:\n", await AccountService.fetchAllAccounts());

//   // account exists
//   const targetAccount = await AccountService.exists({ username });
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
//       await AccountService.deleteAccount(accountId),
//     );
//   } else {
//     console.log("[3] Target account not found.");
//   }

//   // create account
//   const createdAccount = await AccountService.createAccount({
//     username,
//     email,
//     password,
//   });
//   accountId = createdAccount._id.toString();
//   console.log("[4] Creating account:\n", createdAccount);

//   // fetch account
//   console.log(
//     `[5] Fetching account of username: "${username}":\n`,
//     await AccountService.fetchAccountById(accountId),
//   );

//   // authenticating account
//   console.log(
//     `[6] Authenticating account of username: "${accountId}":\n`,
//     await AccountService.authAccount(email, password),
//   );
// };

import * as AccountService from "../account/account.service.js";
import util from "../util/util.js";

export default async () => {
  const username = "username",
    email = "email@email.com",
    password = "password";
  await util.Test.conductTest(
    1,
    "Fetching All Accounts",
    AccountService.fetchAllAccounts,
  );
  await util.Test.conductTest(2, "Creating account", () =>
    AccountService.createAccount({ username, email, password }),
  );
  const result = await util.Test.conductTest(3, "Account Exists", () =>
    AccountService.exists({ username }),
  );
  const accountID = result._id.toString()
  await util.Test.conductTest(4, "Fetching Accounts", () =>
    AccountService.fetchAccountById(accountID),
  );

  await util.Test.conductTest(5, "Upgrade Account", () =>
    AccountService.upgradeAccount(accountID),
  );
  await util.Test.conductTest(6, "Downgrade Account", () =>
    AccountService.downgradeAccount(accountID),
  );
  await util.Test.conductTest(7, "Deleting Account", () =>
    AccountService.deleteAccount(accountID),
  );
};
