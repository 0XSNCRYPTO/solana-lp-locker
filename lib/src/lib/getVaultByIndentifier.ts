import * as anchor from "@coral-xyz/anchor";

import { Vault, vaultDiscriminator } from "./vesting";

import { Connection } from "@solana/web3.js";
import { ValhallaVault } from "./models";

export const getValhallaVaultByIdentifier = async (
  connection: Connection,
  identifier: anchor.BN
): Promise<ValhallaVault> => {
  const builder = await Vault.gpaBuilder();
  builder.addFilter("accountDiscriminator", vaultDiscriminator);
  builder.addFilter("identifier", new anchor.BN(identifier));

  return (await builder.run(connection)).map((v) => {
    const [vault] = Vault.fromAccountInfo(v.account);
    return new ValhallaVault(v.pubkey, vault, connection);
  })[0];
};

export const getVaultByIdentifier = async (
  connection: Connection,
  identifier: anchor.BN
): Promise<Vault> => {
  const builder = await Vault.gpaBuilder();
  builder.addFilter("accountDiscriminator", vaultDiscriminator);
  builder.addFilter("identifier", new anchor.BN(identifier));

  return (await builder.run(connection)).map((v) => {
    const [vault] = Vault.fromAccountInfo(v.account);
    return vault;
  })[0];
};
