export const namesHints = {
  name: 'Unique identifier that may be configured to point to accounts, smart contracts or oracles.',
  nameInAuction: 'Unique identifier that may be configured to point to accounts, contracts or oracles. names shorter than 13 characters are always auctioned.',
  expires: 'Keyblock height and estimated date and time when the name will be detached from the account. After expiration, the name enters into a revoked state and can be claimed again after a fixed timeout of 2016 keyblocks.',
  buyer: 'Account that paid the shown price to claim the name.',
  owner: 'Owner of the name.',
  pointsTo: 'The account the name points to.',
  highestBid: 'Account of the highest bidder and the price of the highest bid. Required minimum bid increase is 5%.',
  bidCount: 'Amount of bids in the auction.',
  ends: 'Keyblock height and estimated date and time when the auction ends.',
  expired: 'Keyblock height and estimated date and time when the name was detached from the account. After expiration, the name entered into a revoked state and can be claimed again after a fixed timeout of 2016 keyblocks.',
  lastBuyer: 'Account that previously paid the shown price to claim the name.',
  lastOwner: 'Last owner of the name.',
  bidder: 'Account of the highest bidder.',
  bid: 'Price of the highest bid.',
  ownedSince: 'Keyblock height and estimated date and time when the account became the owner of the name.',
  status: 'Current state of the name. The possible states are: Active, In Auction or Expired.',
  customPointers: 'User-defined pointers with custom keys.',
  accountPointer: 'The account that the name points to.',
  channelPointer: 'The state channel that the name points to.',
  contractPointer: 'The smart contract that the name points to.',
  oraclePointer: 'The oracle that the name points to.',
  eventTransactionHash: 'Transaction hash of the name event.',
  eventTime: 'Keyblock height and estimated date and time when the event was triggered.',
  activity: 'Type of event that was triggered.',
  recentlyActivatedData: 'The name and its owner who claimed it.',
  activationPrice: 'Amount of AE coins paid for the name activation at fixed price or via auction. These AE coins are burned.',
  activationTime: 'Keyblock height and date and time when the name was activated.',
  nameAndHighestBidder: 'Auctioned name and its highest bidder.',
}
