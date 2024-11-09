// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

abstract contract RealEstateToken is ERC20, Ownable {
    uint256 public constant TOKEN_PRICE = 1 * 10 ** 6; // Precio de 100 USDC por token
    uint256 public constant ANNUAL_YIELD = 15; // 15% de rendimiento anual.
    uint256 public constant TOTAL_TOKENS = 2543 * 10 ** 18; // Número total de tokens

    address public usdcTokenAddress =
        0x5FbDB2315678afecb367f032d93F642f64180aa3; // Dirección de USDC proporcionada
    mapping(address => uint256) public balances;

    // Array para almacenar los inversores
    address[] public investors;

    constructor() ERC20("RealEstateToken", "RET")  Ownable(msg.sender) {
        _mint( address(this), TOTAL_TOKENS); 
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

            uint256 usdcYield = (yield * TOKEN_PRICE) / (10 ** 18); // Calcular el rendimiento en USDC

            // Transferir USDC al inversor
            IERC20(usdcTokenAddress).transfer(investor, usdcYield);
        }
    }

    // Función para que los inversores reclamen su rendimiento en USDC manualmente
    function claimYield() external {
        uint256 investorTokens = balances[msg.sender];
        require(investorTokens > 0, "No tokens owned");

        uint256 yield = (investorTokens * ANNUAL_YIELD) / 100;
        uint256 usdcYield = (yield * TOKEN_PRICE) / (10 ** 18);

        // Transferir USDC al inversor
        IERC20(usdcTokenAddress).transfer(msg.sender, usdcYield);
    }
    function getUsdcTokenAddress() public view returns (address) {
        return usdcTokenAddress;
    }
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

        // Transferir tokens RET al comprador
        _transfer(owner(), msg.sender, tokenAmount);

        // Actualizar balance del inversor
        balances[msg.sender] += tokenAmount;
        investors.push(msg.sender);
    }
    function balanceOf(address account) public view virtual override returns (uint256) {
        return balances[account];
    }

}