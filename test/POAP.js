const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("POAP contract", function() {
    const name = "POAPToken";
    const symbol = "POAP";

    let tokenContract;
    let hardhatToken;
    let owner;
    let alice;
    let token;

    beforeEach(async () => {
        [owner, alice, token] = await ethers.getSigners();
        tokenContract = await ethers.getContractFactory("POAP", owner);
        hardhatToken = await tokenContract.deploy(name, symbol);
    });

    describe("Issue", () => {
        it("Should issue a POAP to alice", async () => {
            await hardhatToken.issue(alice.address, token.address);
            const currentOwner = await hardhatToken.ownerOf(1);
            expect(currentOwner).to.equal(token.address);
        });
    });
});

