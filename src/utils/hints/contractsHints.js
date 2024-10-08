export const contractsHints = {
  contract: 'A smart contract is a program that runs on the æternity blockchain. It\'s a collection of code (its functions) and data (its state) that resides at a specific address (contract id) on the æternity blockchain. Each smart contract has an account associated to it. Functions can be executed by any account via ContractCallTx and may change the smart contract\'s state. Smart contracts on the æternity blockchain are written in Sophia, a typed functional programming language.',
  type: 'Contract implements interface of AEX-X classified smart contract. AEX-9 stands for token, AEX-141 stands for NFT.',
  contractId: 'Unique identifier of a smart contract instance that lives on the blockchain. The green icon indicates whether the smart contract has been verified.',
  contractCreatedHeight: 'Keyblock height when the smart contract was created.',
  contractCreated: 'Exact date and time when the smart contract was created.',
  contractTxHash: 'The transaction hash of a ContractCreateTx that was executed to create the smart contract on the blockchain.',
  token: 'The token which is represented by the AEX-X classified smart contract.',
  contractCreator: 'Account that created the smart contract.',
  bytecode: 'Low-level representation of the smart contract that is generated when the contract\'s source code is compiled.',
  contractsAccount: 'The account associated with the smart contract.',
  contractsAccountBalance: 'The balance of the account associated with the smart contract.',
  contractCalls: 'Amount of calls to the smart contract.',
  apiLinks: 'Links to sources of the smart contract data.',
  callTransactionsHash: 'Unique identifier of the ContractCallTx.',
  callTransactionsTime: 'Keyblock height and exact date and time when the smart contract was called.',
  callTransactionsCaller: 'Account that called the smart contract.',
  callTransactionsEntryPoint: 'Name of the smart contract entrypoint that was called.',
  eventsCallTransaction: 'Unique identifier of the ContractCallTx which emitted the event.',
  eventsCreated: 'Keyblock height and estimated date and time when the smart contract had emitted the event.',
  eventsName: 'Name of the emitted event.',
  eventsData: 'The arguments of the emitted event.',
  created: 'Keyblock height and exact date and time when the smart contract was created.',
  hash: 'The transaction hash of a ContractCreateTx that was executed to create the smart contract on the blockchain.',
  creator: 'Account that created the smart contract on the blockchain.',
  status: 'Status of the transaction.',
  caller: 'Account that called the smart contract.',
  amount: 'Amount of AE coins that were transferred to the smart contract address.',
  entrypoint: 'The entrypoint of the smart contract that was called.',
  arguments: 'Arguments that were passed to the entrypoint.',
  return: 'Value that was returned by the entrypoint.',
  gasLimit: 'Maximum amount of gas to be consumed by this transaction.',
  gasPrice: 'Price for one unit of gas.',
  gasUsed: 'Amount of gas that was consumed by this transaction.',
  gasCost: 'The amount of AE paid for the execution of the contract entrypoint.',
  encodedEvents: 'In order to show decoded events the smart contract needs to be verified.',
}
