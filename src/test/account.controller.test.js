import { Http } from "../config/config.js";
import util from "../util/util.js";

let response_res_holder = null;

async function makeRequest(url, method, data) {
  try {
    let response, res;
    switch (String(method).toLowerCase()) {
      case "get":
        response = await fetch(url);
        break;
      case "post":
        response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        break;
      case "delete":
        response = await fetch(url, {
          method: "DELETE",
        });
        break;
      case "patch":
        response = await fetch(url, { method: "PATCH" });
        break;
      default:
        return null;
    }
    if (response.status == Http.STATUS.NO_CONTENT) {
      return true;
    }
    res = await response.json();
    response_res_holder = res;
    return res.message;
  } catch (error) {
    console.log(error.message || error);
    return null;
  }
}

export default async () => {
  const url = "http://localhost:3000/api/account";
  const username = "username",
    email = "email@email.com",
    password = "password";
  await util.Test.conductTest(
    1,
    "Fetching all accounts",
    () => makeRequest(url, "get"),
    true,
  );
  await util.Test.conductTest(
    2,
    "Creating accouunt",
    () =>
      makeRequest(url, "post", {
        username,
        email,
        password,
      }),
    true,
  );
  const accountID = response_res_holder.account.id;
  await util.Test.conductTest(
    3,
    "Fetch account",
    () => makeRequest(`${url}/${accountID}`, "get"),
    true,
  );
  await util.Test.conductTest(
    4,
    "Authenticate account",
    () =>
      makeRequest(`${url}/auth`, "post", {
        email,
        password,
      }),
    true,
  );
  await util.Test.conductTest(
    5,
    "Upgrade account",
    () => makeRequest(`${url}/upgrade/${accountID}`, "patch"),
    true,
  );
  await util.Test.conductTest(
    6,
    "Downgrade account",
    () => makeRequest(`${url}/downgrade/${accountID}`, "patch"),
    true,
  );
  await util.Test.conductTest(
    7,
    "Delete account",
    () => makeRequest(`${url}/${accountID}`, "delete"),
  );
};
