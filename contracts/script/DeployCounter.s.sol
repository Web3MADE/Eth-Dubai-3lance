// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {IEAS} from "eas-contracts/IEAS.sol";
import {Counter} from "../src/Counter.sol";
/**@dev script for deploying resolver to Sepolia */
contract DeployCounter is Script {
    function run() public {
        vm.startBroadcast();
        new Counter();
        vm.stopBroadcast();
    }
}
