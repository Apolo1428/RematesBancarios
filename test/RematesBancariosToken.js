const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Verificación de funcionamiento del contrato RematesBancariosToken", function () {
    let rematesBancariosToken, mockUSDC, owner, investor;

    beforeEach(async () => {          // Esta función se ejecutará cada que se haga una comprobación con "describe"
        // Obtener los signers
        [owner, investor] = await ethers.getSigners();

        // Desplegar el contrato MockUSDC
        const MockUSDC = await ethers.getContractFactory("MockUSDC");
        mockUSDC = await MockUSDC.deploy(); 

        // Desplegar el contrato RematesBancariosTokenImplementation
        const RematesBancariosToken = await ethers.getContractFactory("RematesBancariosToken");
        rematesBancariosToken = await RematesBancariosToken.deploy();
        
        // Configura el contrato de RematesBancariosToken con la dirección de mockUSDC 
        await rematesBancariosToken.connect(owner).setUsdcTokenAddress(mockUSDC.target);

        // Transferir algunos tokens USDC al inversor para que tenga USDC en su bolcillo
        await mockUSDC.transfer(investor.address, ethers.parseUnits('1000', 6)); // 1000 USDC en formato de 6 decimales

    });

    it("Un inversor debería poder comprar tokens:", async function () {
        // Aprobar el contrato para usar los tokens USDC del inversor
        await mockUSDC.connect(investor).approve(
            rematesBancariosToken.target,
            ethers.parseUnits('1000', 6)
        );
        
        // Verificar que el inversor tenga USDC de prueba, y el Owner tenga RBT
        const investorUsdcBalance = await mockUSDC.balanceOf(investor.address);
        console.log("El inversor tiene ", investorUsdcBalance.toString(), " mUSDC");
        const balance = await rematesBancariosToken.balanceOf(investor.address);
        console.log("pero tiene ", balance.toString(), " RBT");
        const ownerRBTBalance  = await rematesBancariosToken.balanceOf(owner.address);
        console.log("\nEl vendedor tiene ", ownerRBTBalance.toString(), " RBT\n");

        // Tokens RBT a comprar

        const RBTcomprar = ethers.parseUnits("4", 2); // comprar 400 tokens
        console.log("El inversor compra ", RBTcomprar.toString(), "RBT al comprador");
        const precio = 1 * 1000 * 400;
        console.log("Por un precio de ", precio.toString()); // habíamos fijado que cada token vale 1 USDC.

        await expect(rematesBancariosToken.connect(investor).buyTokens(RBTcomprar))
            .to.emit(rematesBancariosToken, "Transfer")
            .withArgs(owner.address, investor.address, RBTcomprar);

        console.log("Se ha completado la compra");
        // Verificar el balance de tokens del inversor
        const balance2 = await rematesBancariosToken.balanceOf(investor.address);
        const investorUsdcBalance2 = await mockUSDC.balanceOf(investor.address);
        console.log("Ahora el inversor tiene ", balance2.toString(), " RBT");
        console.log("Antes tenía ", investorUsdcBalance.toString(), "USDC");
        console.log("Pero ahora tiene ", investorUsdcBalance2.toString(), "USDC");
        expect(balance2).to.equal(RBTcomprar);
    });
    it 
});
