import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("HashRegistryModule", (m) => {
  // 部署 HashRegistry 合約
  const registry = m.contract("HashRegistry");

  return { registry };
});