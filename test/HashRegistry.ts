import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { network } from "hardhat";
import { keccak256, toBytes } from "viem";

describe("HashRegistry", async function () {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();

  it("should allow uploading a new hash", async function () {
    const registry = await viem.deployContract("HashRegistry");
    const [deployer] = await viem.getWalletClients();
    const addrLower = deployer.account.address.toLowerCase();


    const hash = keccak256(toBytes("hello"));
    await viem.assertions.emit(
      registry.write.uploadHash([hash]),
      registry,
      "HashUploaded",
    );

    // 驗證上傳後回傳 true
    assert.equal(await registry.read.verifyHash([hash]), true);
  });

  it("should reject duplicate hash upload", async function () {
    const registry = await viem.deployContract("HashRegistry");

    const hash = keccak256(toBytes("world"));
    await registry.write.uploadHash([hash]);

    await assert.rejects(
      registry.write.uploadHash([hash]),
      /Hash already uploaded/,
    );
  });

  it("should return true for an existing hash", async function () {
    const registry = await viem.deployContract("HashRegistry");

    const hash = keccak256(toBytes("宜珊"));
    await registry.write.uploadHash([hash]);

    // 驗證存在的 hash 回傳 true
    const result = await registry.read.verifyHash([hash]);
    assert.equal(result, true);
  });

  it("should return false for non-existing hash", async function () {
    const registry = await viem.deployContract("HashRegistry");

    const hash = keccak256(toBytes("not-exist"));
    assert.equal(await registry.read.verifyHash([hash]), false);
  });
});