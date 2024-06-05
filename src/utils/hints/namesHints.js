export const namesHints = {
  name: 'The æternity naming system (AENS) is a distributed, open, and built-in naming system on the æternity blockchain. Each .chain name is a unique, transferrable identifier that provides a way for users to map human-readable names to blockchain resources such as accounts, smart contracts, oracles, or state channels.',
  nameId: 'Unique identifier that may be configured to point to accounts, contracts, or oracles. names shorter than 13 characters are always auctioned.',
  expires: 'Keyblock height and estimated date and time when the name will be detached from the account. After expiration, the name enters into a revoked state and can be claimed again after a fixed timeout of 2016 keyblocks.',
  expiresTime: 'Estimated date and time when the name will be detached from the account.',
  expiresHeight: 'Keyblock height when the name will be detached from the account. After expiration, the name enters into a revoked state and can be claimed again after a fixed timeout of 2016 keyblocks.',
  buyer: 'Account that paid claim the name.',
  price: 'Price paid to claim the name.',
  owner: 'Owner of the name.',
  pointsTo: 'The account the name points to.',
  highestBid: 'Highest bid price. Required minimum bid increase is 5%.',
  highestBidder: 'Account of the highest bidder.',
  bidCount: 'Amount of bids in the auction.',
  ends: 'Keyblock height and estimated date and time when the auction ends.',
  endsTime: 'Estimated date and time when the auction ends.',
  endsHeight: 'Keyblock height when the auction ends.',
  expired: 'Keyblock height and estimated date and time when the name has been detached from the account. Name passed revoked period and can be claimed again.',
  expiredTime: 'Estimated date and time when the name has been detached from the account. Name passed revoked period and can be claimed again.',
  expiredHeight: 'Keyblock height  when the name has been detached from the account. Name passed revoked period and can be claimed again.',
  revoked: 'Keyblock height and estimated date and time when the name has been detached from the account. Name is in revoked state and can be claimed again after a fixed timeout of 2016 keyblocks after expiration.',
  revokedTime: 'Estimated date and time when the name has been detached from the account.',
  revokedHeight: 'Keyblock height when the name has been detached from the account. Name is in revoked state and can be claimed again after a fixed timeout of 2016 keyblocks after expiration.',
  lastBuyer: 'Account that previously paid to claim the name.',
  lastPrice: 'Price paid to claim the name.',
  lastOwner: 'Last owner of the name.',
  bidder: 'Account of the highest bidder.',
  bid: 'Price of the highest bid.',
  ownedSince: 'Keyblock height and estimated date and time when the account became the owner of the name.',
  ownedSinceTime: 'Estimated date and time when the account became the owner of the name.',
  ownedSinceHeight: 'Keyblock height when the account became the owner of the name.',
  state: 'Current state of the name. The possible states are: Active, In Auction or Expired.',
  customPointers: 'User-defined pointers with custom keys.',
  accountPointer: 'The account that the name points to.',
  channelPointer: 'The state channel that the name points to.',
  contractPointer: 'The smart contract that the name points to.',
  oraclePointer: 'The oracle that the name points to.',
  eventTransactionHash: 'Transaction hash of the name event.',
  eventTime: 'Keyblock height and estimated date and time when the event was triggered.',
  activity: 'Type of event that was triggered.',
  recentlyActivatedData: 'The name and its owner who claimed it.',
  activationPrice: 'Amount of AE coins paid for the name activation at a fixed price or via auction. These AE coins are burned.',
  activationTime: 'Keyblock height and exact date and time when the name has been activated.',
  nameAndHighestBidder: 'Auctioned name and its highest bidder.',
  preclaimer: 'The account that pre-claimed the name.',
  claimer: 'The account that claimed the name.',
  nameTtl: 'The relative lifetime before expiration in keyblocks.',
  oldOwner: 'The account that previously owned the name.',
  newOwner: 'The account that received the name and became its new owner.',
}
