import { network } from "hardhat";

// move the block forward to amount
// basically produe blocks faster so you don't have to wait 
// useful for dev and test
export async function moveBlocks(amount:number){
    console.log("Moving blocks...");
    for (let index=0; index<amount;index++){
        await network.provider.request({
            method:"evm_mine",
            params:[],
        })
    }
    console.log(`Moved ${amount} blocks`)
}