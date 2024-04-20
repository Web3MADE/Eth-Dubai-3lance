// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {IEAS} from "eas-contracts/IEAS.sol";
import {JobResolver} from "../src/JobResolver.sol";
/**@dev script for deploying resolver to Sepolia */
contract DeployResolver is Script {
    function run() public {
        vm.startBroadcast();
        new JobResolver(
            IEAS(0xC2679fBD37d54388Ce493F1DB75320D236e1815e)
        );
        vm.stopBroadcast();
    }
}
