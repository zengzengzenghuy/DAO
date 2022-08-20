import {GovernorContract, GovernanceToken, Timelock, Votebox} from "../typechain-types";
import {deployments,ethers} from "hardhat";
import {assert,expect} from "chai";
import {FUNC,DESCRIPTION,NEW_STORE_VALUE,VOTING_DELAY,VOTING_PERIOD,MIN_DELAY} from "../helper-deploy";
import {moveBlocks} from "../utils/move-blocks";
import {moveTime} from "../utils/move-time";

describe("Test governance flow", async()=>{
    let governor: GovernorContract;
    let governanceToken: GovernanceToken;
    let timelock : Timelock;
    let votebox: Votebox;
    const voteDecision= 1;
    const reason= "I agree with you";
    beforeEach(async()=>{
        await deployments.fixture(["all"]);
        governor = await ethers.getContract("GovernorContract");
        timelock = await ethers.getContract("Timelock");
        governanceToken = await ethers.getContract("GovernanceToken");
        votebox = await ethers.getContract("Votebox");
    })
    it("can only be changed through governance",async()=>{
        await expect(votebox.newVote(42)).to.be.revertedWith("Ownable: caller is not the owner")
    })
})

