const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Verificación de funcionamiento del contrato RematesBancariosToken", function () {
    let rematesBancariosToken, mockUSDC, owner, investor;

    const format_18 = (number) => {
        let a = number/ethers.parseUnits('1', 18);
        return a.toString()
    } 
    beforeEach(async () => {          // Esta función se ejecutará cada que se haga una comprobación con "describe"
        // Obtener los signers
        [owner, investor] = await ethers.getSigners();

        // Desplegar el contrato MockUSDC
        const MockUSDC = await ethers.getContractFactory("MockUSDC");
        mockUSDC = await MockUSDC.deploy(); 

        // Desplegar el contrato RematesBancariosTokenImplementation
        TOKEN_PRICE = ethers.parseUnits("1",0);
        ANNUAL_YIELD = 15;
        TOTAL_TOKENS = ethers.parseUnits("2530",18);;
        const RematesBancariosToken = await ethers.getContractFactory("RematesBancariosToken");
        rematesBancariosToken = await RematesBancariosToken.deploy(
            TOKEN_PRICE,
            ANNUAL_YIELD,
            TOTAL_TOKENS
        );
        
        // Configura el contrato de RematesBancariosToken con la dirección de mockUSDC 
        await rematesBancariosToken.connect(owner).setUsdcTokenAddress(mockUSDC.target);

        // Transferir algunos tokens USDC al inversor para que tenga USDC en su bolcillo
        await mockUSDC.transfer(investor.address, ethers.parseUnits('1000', 18)); // 1000 USDC en formato de 6 decimales

    });

    it("Un inversor debería poder comprar tokens:", async function () {
        // Aprobar el contrato para usar los tokens USDC del inversor
        await mockUSDC.connect(investor).approve(
            rematesBancariosToken.target,
            ethers.parseUnits('1000', 18)
        );
        
        // Verificar que el inversor tenga USDC de prueba, y el Owner tenga RBT
        const investorUsdcBalance = await mockUSDC.balanceOf(investor.address);
        console.log("El inversor tiene ", format_18(investorUsdcBalance), " mUSDC");
        const balance = await rematesBancariosToken.balanceOf(investor.address);
        console.log("pero tiene ", format_18(balance), " RBT");
        const ownerRBTBalance  = await rematesBancariosToken.balanceOf(owner.address);
        console.log("\nEl vendedor tiene ", format_18(ownerRBTBalance), " RBT\n");

        // Tokens RBT a comprar

        const RBTcomprar = ethers.parseUnits("400",18); // comprar 400 tokens
        console.log("El inversor compra ", format_18(RBTcomprar), "RBT al comprador");
        console.log("Por un precio de ", format_18(TOKEN_PRICE*RBTcomprar), " USDC");

        await expect(rematesBancariosToken.connect(investor).buyTokens(RBTcomprar))
            .to.emit(rematesBancariosToken, "Transfer")
            .withArgs(owner.address, investor.address, RBTcomprar);

        console.log("\n----> Se ha completado la compra \n");
        // Verificar el balance de tokens del inversor
        const balance2 = await rematesBancariosToken.balanceOf(investor.address);
        const investorUsdcBalance2 = await mockUSDC.balanceOf(investor.address);
        console.log("Ahora el inversor tiene ", format_18(balance2), " RBT");
        console.log("Antes tenía ", format_18(investorUsdcBalance), "USDC");
        console.log("Pero ahora tiene ", format_18(investorUsdcBalance2), "USDC");
        expect(balance2).to.equal(RBTcomprar);
    });
    it("Un inversor debería reclamar su rendimiento ", async function () {
        // Simular la compra de tokens para el inversor
        await mockUSDC.connect(investor).approve(rematesBancariosToken.target, ethers.parseUnits("1000", 18));

        const RBTcomprar = ethers.parseUnits("200", 18); // comprar 200 tokens
        await rematesBancariosToken.connect(investor).buyTokens(RBTcomprar); 
    
        // Verificar que el inversor tenga el saldo de tokens RET
        const balance = await rematesBancariosToken.balanceOf(investor.address);
        expect(balance).to.equal(RBTcomprar);
    
        console.log("El inversor ha comprado ", format_18(balance), " RBT exitosamente!");

        // Debemos saber cuanto tiene nuestro inversor ahora:
        const investorUsdcBalanceInicial = await mockUSDC.balanceOf(investor.address);
        // Ejecutar la función de reclamo de rendimiento por parte del inversor
        await rematesBancariosToken.connect(investor).claimYield();
    
        // Calcular el rendimiento esperado
        const expectedYield = RBTcomprar*15n/100n;

        // Verificar que el inversor recibió el rendimiento en USDC
        const investorUsdcBalance = await mockUSDC.balanceOf(investor.address);
        console.log("El invesor tenía ", format_18(investorUsdcBalanceInicial), "USDC")
        console.log("El invesor tiene ", format_18(investorUsdcBalance), "USDC")
        console.log("El inversor ha ganado: ", format_18(expectedYield), ' USDC luego de un año');
        expect(investorUsdcBalance - investorUsdcBalanceInicial).to.equal(expectedYield);
    });
    it("Debería distribuir a todos los inversores", async function () {
        // Simular la compra de tokens por parte de dos inversores
        await mockUSDC.connect(investor).approve(rematesBancariosToken.target, ethers.parseUnits("1000", 18));

        const RBTcomprar1 = ethers.parseUnits("200", 18); // comprar 200 tokens RBT
        await rematesBancariosToken.connect(investor).buyTokens(RBTcomprar1); 
    
        const investor2 = (await ethers.getSigners())[2];
        // Darle dinero al inversor de antemano para que pueda comprar
        await mockUSDC.transfer(investor2.address, ethers.parseUnits('1000', 18));
        const RBTcomprar2 = ethers.parseUnits("300", 18); // comprar 300 tokens RBT
        await mockUSDC.connect(investor2).approve(rematesBancariosToken.target, ethers.parseUnits("1000", 18));
        await rematesBancariosToken.connect(investor2).buyTokens(RBTcomprar2);
        
        // Obtener lo que tienen nuestros inversores:
        const investor1UsdcBalanceInicial = await mockUSDC.balanceOf(investor.address);
        const investor2UsdcBalanceInicial = await mockUSDC.balanceOf(investor2.address);

        // Ejecutar la función para distribuir el rendimiento anual
        await rematesBancariosToken.connect(owner).distributeAnnualYield();
    
        // Calcular el rendimiento esperado para cada inversor
        const expectedYieldInvestor1 = RBTcomprar1*15n/100n;
        const expectedYieldInvestor2 = RBTcomprar2*15n/100n;
    
        // Verificar que los inversores recibieron el rendimiento en USDC
        const investor1UsdcBalance = await mockUSDC.balanceOf(investor.address);
        const investor2UsdcBalance = await mockUSDC.balanceOf(investor2.address);
        console.log("El inversor 1 ha ganado: ", format_18(expectedYieldInvestor1), ' USDC luego de un año');
        console.log("El inversor 2 ha ganado: ", format_18(expectedYieldInvestor2), ' USDC luego de un año');
        expect(investor1UsdcBalance - investor1UsdcBalanceInicial).to.equal(expectedYieldInvestor1);
        expect(investor2UsdcBalance - investor2UsdcBalanceInicial).to.equal(expectedYieldInvestor2);
    });
    
});
