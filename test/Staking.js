const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Staking POAP in Token", function() {
    const tokenName = "Token";
    const tokenSymbol = "TOKEN";
    const poapName = "POAPToken";
    const poapSymbol = "POAP";

    let tokenContract;
    let hardhatToken;
    let poapContract;
    let hardhatPOAP;
    let owner;
    let eventer;

    beforeEach(async () => {
        [owner, eventer, alice] = await ethers.getSigners();
        tokenContract = await ethers.getContractFactory("Token", owner);
        poapContract = await ethers.getContractFactory("POAP", eventer);

        hardhatToken = await tokenContract.deploy(tokenName, tokenSymbol);
        hardhatPOAP = await poapContract.deploy(poapName, poapSymbol);
    });

    describe("Mint", (done) => {
        
        it("should mint a token to an owner", async () => {
            hardhatToken.mint();
            let currentOwner = await hardhatToken.ownerOf(1);
            expect(currentOwner).to.equal(owner.address);
        });

        describe("Issue", () => {
            it("should issue a poap to a token", async () => {
                hardhatToken.mint();
                await hardhatPOAP.issue(owner.address, hardhatToken.address);

                const poap = await hardhatToken.poap(1, 0);
                expect(poap.poapAddress).to.equal(hardhatPOAP.address);
                expect(poap.tokenId).to.equal(1);
                
                currentOwner = await hardhatPOAP.ownerOf(1);
                expect(currentOwner).to.equal(hardhatToken.address);
            });

            it("should have a poap in a token", async () => {
                hardhatToken.mint();
                await hardhatPOAP.issue(owner.address, hardhatToken.address);

                const balance = await hardhatToken.poapBalanceOf(1);
                expect(balance).to.equal(1);
            });
        });
    });
});


