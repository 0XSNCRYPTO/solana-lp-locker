import * as anchor from "@coral-xyz/anchor";

import { PROGRAM_ID, Vault } from "./vesting";

import { Connection } from "@solana/web3.js";
import { ValhallaVault } from "./models";
import { getAccount } from "@solana/spl-token";
import { getMintWithCorrectTokenProgram } from "./getMintWithCorrectTokenProgram";
import { getPDAs } from "./getPDAs";

export const hasStartDatePassed = async (startDateInSeconds: number) => {
  const currentTime = Math.floor(Date.now() / 1000);

  return startDateInSeconds <= currentTime;
};

export async function canDisburseVault(
  connection: Connection,
  vault: Vault | ValhallaVault
): Promise<boolean> {
  const currentTime = Math.floor(Date.now() / 1000);
  const totalNumberOfPayouts = Number(vault.totalNumberOfPayouts);
  const numberOfPaymentsMade = Number(vault.numberOfPaymentsMade);
  const startDate = Number(vault.startDate);

  if (numberOfPaymentsMade === totalNumberOfPayouts) return false;

  const { vaultAta } = getPDAs(
    PROGRAM_ID,
    new anchor.BN(vault.identifier),
    vault.creator,
    vault.mint
  );

  const { tokenProgramId } = await getMintWithCorrectTokenProgram(
    connection,
    vault
  );

  const ata = await getAccount(
    connection,
    vaultAta,
    "confirmed",
    tokenProgramId
  );

  const balance = Number(ata.amount);

  return balance > 0 && startDate <= currentTime;
}
