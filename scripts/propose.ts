import  * as fs from "fs";
import { ethers,network } from "hardhat";
import { NEW_STORE_VALUE,FUNC,DESCRIPTION,developmentChains,VOTING_DELAY,proposalsFile } from "../helper-deploy";
import { moveBlocks } from "../utils/move-blocks";

export async function propose(args: any[],functionToCall: string,desciption:string){
    const governor = await ethers.getContract("GovernorContract");
    const Votebox = await ethers.getContract("Votebox");
    //https://docs.ethers.io/v5/api/utils/abi/interface/
    // arg: (fragment, [,values])
    // fragment is bytes[] memory calldatas in GovernorContract.propose()
    const encodedFunctionCall = Votebox.interface.encodeFunctionData(
        functionToCall,
        args
    );
    console.log(`Proposing ${functionToCall} with args ${args} on Votebox at ${Votebox.address}`);
    console.log(`Proposal description ${DESCRIPTION}`);
    const proposeTx = await governor.propose(
        [Votebox.address],
        [0],
        [encodedFunctionCall],
        DESCRIPTION
    );
    if (developmentChains.includes(network.name)){
        console.log('Yes move to voting delay');
        await moveBlocks(VOTING_DELAY+1);
    }
    const proposeReceipt = await proposeTx.wait(1);
    //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/governance/Governor.sol#L271
    const proposalId = proposeReceipt.events[0].args.proposalId;
    console.log(`Proposed with Proposal ID: \n ${proposalId}`);
    
    // Governor.state() 
    // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/governance/Governor.sol#L145
    const proposalState = await governor.state(proposalId)
    const proposalSnapShot = await governor.proposalSnapshot(proposalId)
    const proposalDeadline = await governor.proposalDeadline(proposalId)

    //store proposalId
    let proposals = JSON.parse(fs.readFileSync(proposalsFile,"utf8"));
    // chaindId!. means that there will surely be a chainId
    proposals[network.config.chainId!.toString()].push(proposalId.toString());
    fs.writeFileSync(proposalsFile,JSON.stringify(proposals));

    // // The state of the proposal. 1 is not passed. 0 is passed.
    // proposalState is from IGovernor.sol
    // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/governance/IGovernor.sol#L14
    // 0: pending
    console.log(`Current Proposal State: ${proposalState}`)
    // What block # the proposal was snapshot
    console.log(`Current Proposal Snapshot: ${proposalSnapShot}`)
    // The block number the proposal voting expires
    console.log(`Current Proposal Deadline: ${proposalDeadline}`)
}

propose([NEW_STORE_VALUE],FUNC,DESCRIPTION)
.then(()=>process.exit(0))
.catch((error)=>{
    console.log(error);
    process.exit(1)
})