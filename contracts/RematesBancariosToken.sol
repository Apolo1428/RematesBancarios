// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract RematesBancariosToken is ERC20, Ownable {
    uint256 public TOKEN_PRICE; 
    uint256 public ANNUAL_YIELD; 
    uint256 public TOTAL_TOKENS;
    address public usdcTokenAddress =
        0x7570cC94d3ea389cE659DeC12d659356f253066A; 
    mapping(address => uint256) public balances;

    address[] public investors;

    constructor(
        uint256 TOKEN_PRICE_,
        uint256 ANUAL_YIELD_,
        uint256 TOTAL_TOKENS_
    ) ERC20("RematesBancariosToken", "RBT") Ownable(msg.sender) {
        TOKEN_PRICE = TOKEN_PRICE_;
        ANNUAL_YIELD = ANUAL_YIELD_;
        TOTAL_TOKENS = TOTAL_TOKENS_;
        _mint(msg.sender, TOTAL_TOKENS);
    }
    function setUsdcTokenAddress(address _usdcTokenAddress) external onlyOwner {
        usdcTokenAddress = _usdcTokenAddress;
    }

    // Función para comprar tokens con USDC

    // Función para distribuir rendimientos anuales a los inversores en USDC
    function distributeAnnualYield() external onlyOwner {
        for (uint256 i = 0; i < investors.length; i++) {
            address investor = investors[i];
            uint256 investorTokens = balances[investor];
            uint256 yield = (investorTokens * ANNUAL_YIELD) / 100; // Calcular el 15% de rendimiento

            uint256 usdcYield = yield * TOKEN_PRICE; // Calcular el rendimiento en USDC

            // Transferir USDC al inversor
            IERC20(usdcTokenAddress).transfer(investor, usdcYield);
        }
    }

    // Función para que los inversores reclamen su rendimiento en USDC manualmente
    function claimYield() external {
        uint256 investorTokens = balances[msg.sender];
        require(investorTokens > 0, "No tokens owned");

        uint256 yield = (investorTokens * ANNUAL_YIELD) / 100;
        uint256 usdcYield = yield * TOKEN_PRICE ;

        // Transferir USDC al inversor
        IERC20(usdcTokenAddress).transfer(msg.sender, usdcYield);
    }
    function getUsdcTokenAddress() public view returns (address) {
        return usdcTokenAddress;
    }

    // Función para que los inversores compren tokens RBT 
    function buyTokens(uint256 tokenAmount) external {
        uint256 cost = tokenAmount * TOKEN_PRICE;
        require(
            IERC20(usdcTokenAddress).balanceOf(msg.sender) >= cost,
            "Insufficient USDC balance"
        );
        require(
            IERC20(usdcTokenAddress).allowance(msg.sender, address(this)) >= cost,
            "USDC allowance too low"
        );

        // Transferir USDC al contrato desde el comprador
        IERC20(usdcTokenAddress).transferFrom(msg.sender, address(this), cost);

        // Transferir tokens RBT al comprador
        _transfer(owner(), msg.sender, tokenAmount);

        // Actualizar balance del inversor
        balances[msg.sender] += tokenAmount;
        investors.push(msg.sender);
    }

}