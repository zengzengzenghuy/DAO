import * as fs from "fs";
import {ethers, network} from "hardhat";
// @ts-ignore
import {proposalsFile,VOTING_PERIOD,developmentChains} from "../helper-deploy.ts";
import {moveBlocks} from "../utils/move-blocks"

// get last index on proposal.json = latest proposalId
const index = 3;
async function vote(proposalIndex:number){
    const proposals = JSON.parse(fs.readFileSync(proposalsFile,"utf8"));
    const proposalId = proposals[network.config.chainId!][proposalIndex];
    console.log(`Porposal id : ${proposalId}`)
    // 1 = Yes, 0 = No, 2 = Abstain
    const voteDecision = 1;
    const governor = await ethers.getContract("GovernorContract");
    const reason = "Everyday is a new day";
    //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/governance/Governor.sol#L421
    //  uint256 proposalId,
    //  uint8 support,
    //  string calldata reason
    console.log("1")
    const voteTxResponse = await governor.castVoteWithReason(
        proposalId,
        voteDecision,
        reason
    );
    //Error
    //reason: "Error: VM Exception while processing transaction: reverted with reason string 'Governor: vote not currently active'"
    await voteTxResponse.wait(1);
    // status of voting

    console.log("Voted!")
    const executionTxResponse = await governor.state(proposalId);
    // enum ProposalState {
    //     Pending,
    //     Active,
    //     Canceled,
    //     Defeated,
    //     Succeeded,
    //     Queued,
    //     Expired,
    //     Executed
    // }
    console.log(`Execution state: ${executionTxResponse}`)
    if(developmentChains.includes(network.name)){
        await moveBlocks(VOTING_PERIOD+1);

    }
}

vote(index)
    .then(()=>process.exit(0))
    .catch((error)=>{console.error(error);process.exit(1);})