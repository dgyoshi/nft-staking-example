const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function() {
    const name = "Token";
    const symbol = "TOKEN";

    let tokenContract;
    let hardhatToken;
    let alice;
    let bob;

    beforeEach(async () => {
        [alice, bob] = await ethers.getSigners();
        tokenContract = await ethers.getContractFactory("Token", alice);
        hardhatToken = await tokenContract.deploy(name, symbol);
    });

    describe("Mint", () => {
        it("Should mint a token to alice", async () => {
            hardhatToken.mint();
            const owner = await hardhatToken.ownerOf(1);
            expect(owner).to.equal(alice.address);
        });
    });
});
