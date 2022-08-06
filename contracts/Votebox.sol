// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Votebox is Ownable{
    uint256 private vote;
    event NewVoteNumber(uint256 _vote);

    function newVote (uint256 _vote)public onlyOwner{
        vote = _vote;
        emit NewVoteNumber(_vote);
    }
    function getVote()public view returns(uint256){
        return vote;
    }
}