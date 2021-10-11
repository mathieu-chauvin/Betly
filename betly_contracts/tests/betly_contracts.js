const anchor = require('@project-serum/anchor');

describe('betly_contracts', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  it('Is initialized!', async () => {
		  /// The program to execute.
		  //const program = anchor.workspace.Basic0;

		  // The Account to create.
		  const myAccount = anchor.web3.Keypair.generate();

		  // Create the new account and initialize it with the program.
		  const start = async function() { await program.rpc.initialize(new anchor.BN(1234), {
			accounts: {
			myAccount: myAccount.publicKey,
			user: provider.wallet.publicKey,
			systemProgram: SystemProgram.programId,
			},
			signers: [myAccount],
			});};

		  /// Add your test here.
    const program = anchor.workspace.BetlyContracts;
    const tx = await program.rpc.initialize();
    console.log("Your transaction signature", tx);
  });
});
