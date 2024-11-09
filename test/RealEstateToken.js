const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RealEstateToken Contract", function () {
    let realEstateToken, mockUSDC, owner, investor;

    beforeEach(async () => {
        // Obtener los signers
        [owner, investor] = await ethers.getSigners();

        // Desplegar el contrato MockUSDC
        const MockUSDC = await ethers.getContractFactory("MockUSDC");
        mockUSDC = await MockUSDC.deploy();
        // Desplegar el contrato RealEstateTokenImplementation
        const RealEstateTokenImplementation = await ethers.getContractFactory("RealEstateTokenImplementation");
        
        realEstateToken = await RealEstateTokenImplementation.deploy();

        const ownerBalance = await realEstateToken.balanceOf(owner.address);
        console.log("Owner's RET balance:", ownerBalance.toString());
        console.log("/////////////////////////////");
        // Configura el contrato de RealEstateToken con la dirección de mockUSDC
        await realEstateToken.connect(owner).setUsdcTokenAddress(mockUSDC.target);
        // Transferir algunos tokens USDC al inversor para simular una compra
        await mockUSDC.transfer(investor.address, ethers.parseUnits('1000', 6)); // 1000 USDC en formato de 6 decimales
        
        // Verificar que la dirección de usdcTokenAddress se configuró correctamente
        const usdcAddressInToken = await realEstateToken.getUsdcTokenAddress();
        console.log("USDC Token Address in RealEstateToken:", usdcAddressInToken);
        expect(usdcAddressInToken).to.equal(mockUSDC.target);

    });

    it("should allow an investor to buy tokens", async function () {
        // Aprobar el contrato para usar los tokens USDC del inversor

        await mockUSDC.connect(investor).approve(
            realEstateToken.target,
            ethers.parseUnits('1000', 6)
        );

        // El inversor compra 1 token RET

        const investorUsdcBalance = await mockUSDC.balanceOf(investor.address);
        console.log("USDC Balance of investor:", investorUsdcBalance.toString()); // Debería ser 1000 USDC en formato de 6 decimalesn
        const balance = await realEstateToken.balanceOf(investor.address);

        console.log(balance);
        await expect(realEstateToken.connect(investor).buyTokens(ethers.parseUnits("1", 18)))
            .to.emit(realEstateToken, "Transfer")
            .withArgs(owner.address, investor.address, ethers.parseUnits("1", 18));
        console.log("/////////////////////////////");
        // Verificar el balance de tokens del inversor
        balance = await realEstateToken.balanceOf(investor.address);
        expect(balance).to.equal(ethers.utils.parseUnits("1", 18));
    });
});
