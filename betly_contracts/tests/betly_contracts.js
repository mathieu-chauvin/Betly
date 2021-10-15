const assert = require("assert")
const anchor = require("@project-serum/anchor");
const {SystemProgram} = anchor.web3;

describe("bet-program", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.local()
  anchor.setProvider(provider);

  it("Uses the workspace to invoke the initialize instruction", async () => {
    // #region code
    // Read the deployed program from the workspace.
    const program = anchor.workspace.BetProgram;

    const betAccount = anchor.web3.Keypair.generate();
    const betAccount2 = anchor.web3.Keypair.generate();

    // Execute the RPC.
    await program.rpc.createBet(new anchor.BN(1234), 3, {
      accounts:{
        betAccount: betAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [betAccount],
    });
    // #endregion code

    // Execute the RPC.
    await program.rpc.createBet(new anchor.BN(12345), 4, {
      accounts:{
        betAccount: betAccount2.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [betAccount2],
    });
    // #endregion code

    //const account = await program.account.betAccount.fetch(betAccount.publicKey);
    const account= await program.account.betAccount.fetch(betAccount2.publicKey);

    assert.ok(account.bet.eq(new anchor.BN(12345)));

    _betAccount = betAccount;
    _betAccount2 = betAccount2;
  });

  it("update the data", async() => {
    const betAccount = _betAccount;
    const betAccount2 = _betAccount2;
    console.log(betAccount2.publicKey);
      const program = anchor.workspace.BetProgram;

      await program.rpc.updateBet(new anchor.BN(4321), 9, {
        accounts: {
          betAccount: _betAccount.publicKey,
        },
      });

      const account = await program.account.betAccount.fetch(betAccount.publicKey);
      const account2 = await program.account.betAccount.fetch(betAccount2.publicKey);

      assert.ok(account.bet.eq(new anchor.BN(4321)));
      assert.ok(account2.team === 4);
  });
});
