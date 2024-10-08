import * as anchor from "@coral-xyz/anchor";
import type * as beet from "@metaplex-foundation/beet";

import { PublicKey } from "@solana/web3.js";

export const CONFIG_SEED = Buffer.from("config");
export const VAULT_SEED = Buffer.from("vault");
export const VAULT_ATA_SEED = Buffer.from("vault_ata");

export interface VestingPDAs {
  config: PublicKey;
  vault: PublicKey;
  vaultAta: PublicKey;
}

export function getPDAs(
  programId: PublicKey,
  identifier?: beet.bignum,
  creator?: PublicKey,
  mint?: PublicKey
): VestingPDAs {
  const [config] = PublicKey.findProgramAddressSync([CONFIG_SEED], programId);

  if (!identifier || !creator || !mint) {
    return {
      config,
      vault: new PublicKey(0),
      vaultAta: new PublicKey(0),
    };
  }

  const [vault] = PublicKey.findProgramAddressSync(
    [
      new anchor.BN(identifier).toArrayLike(Buffer, "le", 8),
      creator.toBuffer(),
      mint.toBuffer(),
      VAULT_SEED,
    ],
    programId
  );

  const [vaultAta] = PublicKey.findProgramAddressSync(
    [vault.toBuffer(), VAULT_ATA_SEED],
    programId
  );

  return {
    config,
    vault,
    vaultAta,
  };
}
