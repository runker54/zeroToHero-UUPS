# zeroToHero训练营作业
本次作业使用hardhat openzeppelin透明可代理升级合约完成。

## .合约地址

简介：V1版本合约、V2版本合约、Proxy合约，ProxyAdmin合约

 - V1版本合约：0x871C834677ad926DbA441A1c3B44a057860126B4

 - 部署链接：https://testnet.bscscan.com/tx/0x523644226158f0752dc294f32fa35b086f04c314f0156615a8fb30f81c9be771


 - V2版本合约：0x2a8411D86E084f4Dad3644418C88654C08E8f24c

 - 部署链接：https://testnet.bscscan.com/tx/0xa4040497af50163d9b5bba0d471699fd06afcee8bd6c98b9783e2bd2cdd46fca


 - Proxy合约：0x64ea0eA7ed563594DB4463d70dd2CE561A2b894a

 - 部署链接：https://testnet.bscscan.com/tx/0xb4bbb87e6cd621daff7309584f84cafaf2b23b9d13826dc93eb46034f8c3d0e5

 - ProxyAdmin合约：0xf90c20b767FAc71C1Aac50081B2FAc5639c3D865

 - 部署链接：https://testnet.bscscan.com/tx/0xe1bda94f6965ae9ad13715f4be7a0a532085504ef1f796dab18b2b496a71a092

## 2.合约交互

简介：部署第一版本后，进行一次交互，升级合约后，在进行交互，查看合约变量变化情况。
 
 - V1 sign_in function交互：https://testnet.bscscan.com/tx/0x8cc5de0a103e854dbf24c75e1c75459e595e0d911a8cc8fbc2203759274efd4a

 - upgrade：https://testnet.bscscan.com/tx/0xe77346023ed337668f5d63856910d03e9a1be762673c7bd843747800ad2ee096

 - V2 sign_in function交互：https://testnet.bscscan.com/tx/0xf5135622a127921b99f8595bff5c74fb5cdedb51050e7b5840b5c092cb8d8b7b

 - V2 exit function交互：https://testnet.bscscan.com/tx/0x8af4097c73d7e80e9b6c74c66fd062ec2c3d55e44b284515ae85c4f095443bd0


## 3.合约源码

### V1合约

```solidity
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
```

### V2合约

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Runker_V2 is Initializable {
    uint256 public ActivityValue;
    address public root;
    mapping(address => bool) public activityNote;
    address[] public ownerHistory;

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

    function exit() public {
        require(activityNote[msg.sender], "You haven't joined yet");
        activityNote[msg.sender] = true;
        ActivityValue++;
    }

    function change_owner(address _newRoot) public {
        require(msg.sender == root, "Permission denied");
        root = _newRoot;
        ownerHistory.push(_newRoot);
    }
}
```