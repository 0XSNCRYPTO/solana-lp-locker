/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as splToken from "@solana/spl-token";
import * as beet from "@metaplex-foundation/beet";
import * as web3 from "@solana/web3.js";
import { Authority, authorityBeet } from "../types/Authority";

/**
 * @category Instructions
 * @category CreateLock
 * @category generated
 */
export type CreateLockInstructionArgs = {
  amountToBeVested: beet.bignum;
  vestingDuration: beet.bignum;
  payoutInterval: beet.bignum;
  cliffPaymentAmount: beet.bignum;
  startDate: beet.bignum;
  cancelAuthority: Authority;
  changeRecipientAuthority: Authority;
};
/**
 * @category Instructions
 * @category CreateLock
 * @category generated
 */
export const createLockStruct = new beet.BeetArgsStruct<
  CreateLockInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ["instructionDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)],
    ["amountToBeVested", beet.u64],
    ["vestingDuration", beet.u64],
    ["payoutInterval", beet.u64],
    ["cliffPaymentAmount", beet.u64],
    ["startDate", beet.u64],
    ["cancelAuthority", authorityBeet],
    ["changeRecipientAuthority", authorityBeet],
  ],
  "CreateLockInstructionArgs"
);
/**
 * Accounts required by the _createLock_ instruction
 *
 * @property [_writable_, **signer**] funder
 * @property [] recipient
 * @property [] locker
 * @property [_writable_] treasury
 * @property [_writable_] lock
 * @property [_writable_] lockTokenAccount
 * @property [_writable_] funderTokenAccount
 * @property [_writable_] recipientTokenAccount
 * @property [] mint
 * @property [] associatedTokenProgram
 * @category Instructions
 * @category CreateLock
 * @category generated
 */
export type CreateLockInstructionAccounts = {
  funder: web3.PublicKey;
  recipient: web3.PublicKey;
  locker: web3.PublicKey;
  treasury: web3.PublicKey;
  lock: web3.PublicKey;
  lockTokenAccount: web3.PublicKey;
  funderTokenAccount: web3.PublicKey;
  recipientTokenAccount: web3.PublicKey;
  mint: web3.PublicKey;
  tokenProgram?: web3.PublicKey;
  associatedTokenProgram: web3.PublicKey;
  systemProgram?: web3.PublicKey;
};

export const createLockInstructionDiscriminator = [
  171, 216, 92, 167, 165, 8, 153, 90,
];

/**
 * Creates a _CreateLock_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category CreateLock
 * @category generated
 */
export function createCreateLockInstruction(
  accounts: CreateLockInstructionAccounts,
  args: CreateLockInstructionArgs,
  programId = new web3.PublicKey("5KUhgizPG5tiJpfzEpv1JubQsae6suZf5GKZyqDXqeoJ")
) {
  const [data] = createLockStruct.serialize({
    instructionDiscriminator: createLockInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.funder,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.recipient,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.locker,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.treasury,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.lock,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.lockTokenAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.funderTokenAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.recipientTokenAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.mint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenProgram ?? splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.associatedTokenProgram,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
  ];

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  });
  return ix;
}
