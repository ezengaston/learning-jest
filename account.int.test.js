//Integration test
const Account = require("./account");
const fs = require("fs");

beforeEach(() => {
  try {
    fs.mkdirSync("accounts");
  } catch {
    //Ignore error since folder already exist
  }
});

afterEach(() => {
  fs.rmSync("accounts", { recursive: true, force: true });
});

describe(".create", () => {
  test("It creates a new account and file", async () => {
    const name = "Kyle";
    const account = await Account.create(name);
    expect(account.name).toBe(name);
    expect(account.balance).toBe(0);
    expect(fs.readFileSync(account.filePath).toString()).toBe("0");
  });
});

describe(".find", () => {
  test("It returns the account", async () => {
    const name = "Kyle";
    const balance = 10;
    fs.writeFileSync(`accounts/${name}.txt`, balance.toString());
    const account = await Account.find(name);
    expect(account.name).toBe(name);
    expect(account.balance).toBe(balance);
  });

  describe("When there is no an existing account", () => {
    test("It returns undefined", async () => {
      const name = "Kyle";
      const account = await Account.find(name);
      expect(account).toBeUndefined();
    });
  });
});
