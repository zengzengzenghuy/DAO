// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
// ERC20 votes create a snapshot of who owning the token at a certain block to avoid ppl dumping or buying
// a huge amount of token if they know the proposal beforehand
contract GovernanceToken is ERC20Votes{

    uint256 public maxTokenSupply = 100000000000000000000000;
    constructor()
    ERC20("GovernanceToken","GT")
    ERC20Permit("GovernanceToken") 
    {
        _mint(msg.sender,maxTokenSupply);
    }

}