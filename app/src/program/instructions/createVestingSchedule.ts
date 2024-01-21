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
 * @category CreateVestingSchedule
 * @category generated
 */
export type CreateVestingScheduleInstructionArgs = {
  amountToBeVested: beet.bignum;
  totalVestingDuration: beet.bignum;
  payoutInterval: beet.bignum;
  cliffPaymentAmount: beet.bignum;
  startDate: beet.bignum;
  cancelAuthority: Authority;
  changeRecipientAuthority: Authority;
  name: number[] /* size: 32 */;
};
/**
 * @category Instructions
 * @category CreateVestingSchedule
 * @category generated
 */
export const createVestingScheduleStruct = new beet.BeetArgsStruct<
  CreateVestingScheduleInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ["instructionDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)],
    ["amountToBeVested", beet.u64],
    ["totalVestingDuration", beet.u64],
    ["payoutInterval", beet.u64],
    ["cliffPaymentAmount", beet.u64],
    ["startDate", beet.u64],
    ["cancelAuthority", authorityBeet],
    ["changeRecipientAuthority", authorityBeet],
    ["name", beet.uniformFixedSizeArray(beet.u8, 32)],
  ],
  "CreateVestingScheduleInstructionArgs",
);
/**
 * Accounts required by the _createVestingSchedule_ instruction
 *
 * @property [_writable_, **signer**] creator
 * @property [] recipient
 * @property [] config
 * @property [_writable_] treasury
 * @property [_writable_] vestingSchedule
 * @property [_writable_] vestingScheduleTokenAccount
 * @property [_writable_] creatorTokenAccount
 * @property [_writable_] recipientTokenAccount
 * @property [] mint
 * @property [] associatedTokenProgram
 * @category Instructions
 * @category CreateVestingSchedule
 * @category generated
 */
export type CreateVestingScheduleInstructionAccounts = {
  creator: web3.PublicKey;
  recipient: web3.PublicKey;
  config: web3.PublicKey;
  treasury: web3.PublicKey;
  vestingSchedule: web3.PublicKey;
  vestingScheduleTokenAccount: web3.PublicKey;
  creatorTokenAccount: web3.PublicKey;
  recipientTokenAccount: web3.PublicKey;
  mint: web3.PublicKey;
  tokenProgram?: web3.PublicKey;
  associatedTokenProgram: web3.PublicKey;
  systemProgram?: web3.PublicKey;
};

export const createVestingScheduleInstructionDiscriminator = [
  195, 30, 184, 253, 77, 154, 187, 66,
];

/**
 * Creates a _CreateVestingSchedule_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category CreateVestingSchedule
 * @category generated
 */
export function createCreateVestingScheduleInstruction(
  accounts: CreateVestingScheduleInstructionAccounts,
  args: CreateVestingScheduleInstructionArgs,
  programId = new web3.PublicKey(
    "CpeQRExCTr7a6pzjF7mGsT6HZVpAM636xSUFC4STTJFn",
  ),
) {
  const [data] = createVestingScheduleStruct.serialize({
    instructionDiscriminator: createVestingScheduleInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.creator,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.recipient,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.config,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.treasury,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.vestingSchedule,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.vestingScheduleTokenAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.creatorTokenAccount,
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
