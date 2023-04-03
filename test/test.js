const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers, upgrades } = require('hardhat');
const { expect } = require("chai");

describe("Test", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function TestFixture() {
    const [owner, testAccount, testAccount1, testAccount2] = await ethers.getSigners();
    const activityNumber = 10000;
    const Proxy = await ethers.getContractFactory("Runker_V1");
    const proxy = await upgrades.deployProxy(Proxy, [activityNumber], { from: owner.address });
    await proxy.deployed();
    return { activityNumber, proxy, owner, testAccount, testAccount1 };
  }

  it("Check owner and activityNumber", async function () {
    const { owner, proxy, activityNumber } = await loadFixture(TestFixture);
    //check owner
    expect(await proxy.root()).to.equal(owner.address);
    //check number
    expect(await proxy.ActivityValue()).to.equal(activityNumber);
  });

  it("Check join function", async function () {
    const { testAccount, proxy } = await loadFixture(TestFixture);
    // check join complete
    await proxy.connect(testAccount).sign_in();
    expect(await proxy.activityNote(testAccount.address)).to.equal(true);
    // check number change
    expect(await proxy.ActivityValue()).to.equal(9999) // 9999

  });
});

describe("Test upgrade", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function Testupgrade() {
    const { owner, proxy } = await loadFixture(TestFixture);
    // update contract
    const Runkerv2 = await ethers.getContractFactory("RunkerV2");
    await upgrades.upgradeProxy(proxy.address, Runkerv2, { from: owner.address });
  }

  it("Check old data", async function () {
    const { testAccount, proxy } = await loadFixture(TestFixture);
    // check old data
    expect(await proxy.root()).to.equal(owner.address);
    expect(await proxy.ActivityValue()).to.equal(9999) // 9999
    expect(await proxy.activityNote(testAccount.address)).to.equal(true);


  });

  it("check  old function", async function () {
    const { testAccount1, proxy, } = await loadFixture(TestFixture);
    // check  old function
    await proxy.connect(testAccount1).sign_in();
    expect(await proxy.activityNote(testAccount1.address)).to.equal(true);
    expect(await proxy.ActivityValue()).to.equal(9998) // 9998
  });
  it("check new function exit_activity", async function () {
    const { testAccount, proxy, activityNumber } = await loadFixture(TestFixture);
    // check new function exit_activity
    await proxy.connect(testAccount).exit();
    expect(await proxy.activityNote(testAccount.address)).to.equal(false);
    expect(await proxy.ActivityValue()).to.equal(9999) // 9999
  });
  it("check new function change_owner", async function () {
    const { testAccount2, proxy } = await loadFixture(TestFixture);
    // check new function change_owner
    await proxy.connect(owner).change_owner(testAccount2.address);
    expect(await proxy.root()).to.equal(testAccount2.address);
  });

});
