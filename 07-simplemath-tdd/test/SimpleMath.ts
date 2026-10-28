import { assert, expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.create();

describe("SimpleMath", function () {
  // deploy contract ใหม่ก่อนทุก test case เพื่อให้แต่ละเคสเป็นอิสระต่อกัน
  let simpleMath: any;

  beforeEach(async function () {
    simpleMath = await ethers.deployContract("SimpleMath");
  });

  describe("add", function () {
    it("should add two numbers correctly", async function () {
      const result = await simpleMath.add(2, 3);
      assert.equal(result, 6n);
    });

    it("should return the same number when adding zero", async function () {
      const result = await simpleMath.add(7, 0);
      assert.equal(result, 7n);
    });
  });

  describe("subtract", function () {
    it("should subtract two numbers correctly", async function () {
      const result = await simpleMath.subtract(10, 4);
      assert.equal(result, 6n);
    });

    it("should return zero when subtracting equal numbers", async function () {
      const result = await simpleMath.subtract(5, 5);
      assert.equal(result, 0n);
    });

    it("should revert when the result would be negative", async function () {
      await expect(simpleMath.subtract(3, 5)).to.be.revertedWith(
        "SimpleMath: subtraction underflow",
      );
    });
  });

  describe("multiply", function () {
    it("should multiply two numbers correctly", async function () {
      const result = await simpleMath.multiply(4, 5);
      assert.equal(result, 20n);
    });

    it("should return zero when multiplying by zero", async function () {
      const result = await simpleMath.multiply(9, 0);
      assert.equal(result, 0n);
    });
  });

  describe("divide", function () {
    it("should divide two numbers correctly", async function () {
      const result = await simpleMath.divide(20, 4);
      assert.equal(result, 5n);
    });

    it("should round down when the division has a remainder", async function () {
      const result = await simpleMath.divide(7, 2);
      assert.equal(result, 3n);
    });

    it("should revert when dividing by zero", async function () {
      await expect(simpleMath.divide(1, 0)).to.be.revertedWith(
        "SimpleMath: division by zero",
      );
    });
  });
});
