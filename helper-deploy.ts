export const MIN_DELAY = 3600 // 1 hours = 3600 seconds, after vote passes, user has 1 hr to action(i.e. take out funds) before it enacts

export const VOTING_PERIOD = 5; // 5 blocks
export const VOTING_DELAY= 1; // how many blocks till a proposal vote becomes valid for voters to start oting
export const QUORUM_PERCENTAGE = 4; // need 4% of voters to pass

export const NEW_STORE_VALUE=17;
export const FUNC="newVote"
export const DESCRIPTION="Proposal1: set new vote number"

export const developmentChains = ["hardhat", "localhost"]
export const proposalsFile="proposal.json"