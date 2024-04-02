/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as splToken from '@solana/spl-token'
import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import { Authority, authorityBeet } from '../types/Authority'

/**
 * @category Instructions
 * @category Create
 * @category generated
 */
export type CreateInstructionArgs = {
  identifier: beet.bignum
  name: number[] /* size: 32 */
  amountToBeVested: beet.bignum
  totalVestingDuration: beet.bignum
  startDate: beet.bignum
  payoutInterval: beet.bignum
  cancelAuthority: Authority
  autopay: boolean
}
/**
 * @category Instructions
 * @category Create
 * @category generated
 */
export const createStruct = new beet.BeetArgsStruct<
  CreateInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['identifier', beet.u64],
    ['name', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['amountToBeVested', beet.u64],
    ['totalVestingDuration', beet.u64],
    ['startDate', beet.u64],
    ['payoutInterval', beet.u64],
    ['cancelAuthority', authorityBeet],
    ['autopay', beet.bool],
  ],
  'CreateInstructionArgs'
)
/**
 * Accounts required by the _create_ instruction
 *
 * @property [_writable_, **signer**] creator
 * @property [_writable_] recipient
 * @property [_writable_] devTreasury
 * @property [_writable_] daoTreasury
 * @property [] config
 * @property [_writable_] vault
 * @property [_writable_] vaultAta
 * @property [_writable_] daoTreasuryAta
 * @property [_writable_] creatorAta
 * @property [_writable_] creatorGovernanceAta
 * @property [] mint
 * @property [_writable_] governanceTokenMint
 * @property [] governanceTokenProgram
 * @property [] associatedTokenProgram
 * @category Instructions
 * @category Create
 * @category generated
 */
export type CreateInstructionAccounts = {
  creator: web3.PublicKey
  recipient: web3.PublicKey
  devTreasury: web3.PublicKey
  daoTreasury: web3.PublicKey
  config: web3.PublicKey
  vault: web3.PublicKey
  vaultAta: web3.PublicKey
  daoTreasuryAta: web3.PublicKey
  creatorAta: web3.PublicKey
  creatorGovernanceAta: web3.PublicKey
  mint: web3.PublicKey
  governanceTokenMint: web3.PublicKey
  governanceTokenProgram: web3.PublicKey
  tokenProgram?: web3.PublicKey
  associatedTokenProgram: web3.PublicKey
  systemProgram?: web3.PublicKey
}

export const createInstructionDiscriminator = [24, 30, 200, 40, 5, 28, 7, 119]

/**
 * Creates a _Create_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category Create
 * @category generated
 */
export function createCreateInstruction(
  accounts: CreateInstructionAccounts,
  args: CreateInstructionArgs,
  programId = new web3.PublicKey('5AAFQF16iab69Zy2m2u9bSNBQRGWaByA7ZXAxaXeTTN4')
) {
  const [data] = createStruct.serialize({
    instructionDiscriminator: createInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.creator,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.recipient,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.devTreasury,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.daoTreasury,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.config,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.vault,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.vaultAta,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.daoTreasuryAta,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.creatorAta,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.creatorGovernanceAta,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.mint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.governanceTokenMint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.governanceTokenProgram,
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
  ]

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  })
  return ix
}
