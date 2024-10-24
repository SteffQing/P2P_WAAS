// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20, Deployer} from "./Interface.sol";

contract SmartWallet {
    Deployer immutable private deployer;
    address immutable private HotWallet;
    uint constant private min_eth = 1000000 gwei; // 0.001 ETH

    event ReceivedETH(uint amount);
    event SentETH(uint amount);
    event SentToken(string symbol, uint amount);

    modifier onlyAdmin() {
        require(deployer.isSmartWalletAdmin(msg.sender), "Not the admin");
        _;
    }
    constructor(address _hotWallet) {
        deployer = Deployer(msg.sender);
        HotWallet = _hotWallet;
    }

    function _deposit(uint256 amount) private {
        if (amount >= min_eth) {
            (bool success,) = HotWallet.call{value: amount}("");
            require(success, "transfer failed");
        }
    }
    
    // Allow wallet to receive ETH
    receive() external payable {
        uint amount = msg.value;
        _deposit(amount);
        emit ReceivedETH(amount);
    }
    // Withdraw ETH -> Manual
    function withdrawEth(address payable recipient, uint256 amount, uint fee) external onlyAdmin {
        require(recipient != address(0), "cannot send to address 0");
        uint total = amount + fee;
        require(getEthBalance() >= total, "Low ETH balance to withdraw");
        (bool _success,) = address(deployer).call{value: fee}("");
        require(_success, "fee deposit withdraw failed");
        (bool success,) = recipient.call{value: amount}("");
        require(success, "withdraw failed");
        emit SentETH(amount);
    }

    // Withdraw ERC20 tokens from the wallet -> Manual
    function withdrawERC20Token(IERC20 token, address to, uint256 amount, uint fee) external onlyAdmin {
        require(to != address(0), "cannot send to address 0");
        uint total = amount + fee;
        require(getErc20Balance(token) >= total, "Low token balance to withdraw");
        require(token.transfer(address(deployer), fee), "fee transfer failed");
        require(token.transfer(to, amount), "Token transfer failed");
        emit SentToken(token.symbol(), amount);
    }

    // Deposit ETH & ERC20 token to HotWallet - Auto
    function depositETH() external payable onlyAdmin {
        uint256 amount = getEthBalance();
        require(amount > min_eth);
        _deposit(amount);
    }
    function depositERC20Token(IERC20 token) external onlyAdmin {
        uint256 amount = getErc20Balance(token);
        require(token.transfer(HotWallet, amount), "Token transfer failed");
    }

    function getEthBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getErc20Balance(IERC20 token) public view returns (uint) {
        return token.balanceOf(address(this));
    }
}