// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Runker_V1 is Initializable {
    uint256 public ActivityValue;
    address public root;
    mapping(address => bool) public activityNote;

    function initialize(uint256 _number) public initializer {
        ActivityValue = _number;
        root = msg.sender;
    }

    function sign_in() public {
        require(ActivityValue > 0, "Sorry, this activity is full");
        require(!activityNote[msg.sender], "You're already in");
        activityNote[msg.sender] = true;
        ActivityValue--;
    }
}
