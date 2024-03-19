/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as splToken from '@solana/spl-token'
import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'

/**
 * @category Instructions
 * @category CreateConfig
 * @category generated
 */
export type CreateConfigInstructionArgs = {
  devFee: beet.bignum
  tokenFeeBasisPoints: beet.bignum
  governanceTokenAmount: beet.bignum
}
/**
 * @category Instructions
 * @category CreateConfig
 * @category generated
 */
export const createConfigStruct = new beet.BeetArgsStruct<
  CreateConfigInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['devFee', beet.u64],
    ['tokenFeeBasisPoints', beet.u64],
    ['governanceTokenAmount', beet.u64],
  ],
  'CreateConfigInstructionArgs'
)
/**
 * Accounts required by the _createConfig_ instruction
 *
 * @property [_writable_, **signer**] admin
 * @property [_writable_] config
 * @property [] devTreasury
 * @property [] daoTreasury
 * @property [_writable_] governanceTokenMint
 * @property [] associatedTokenProgram
 * @category Instructions
 * @category CreateConfig
 * @category generated
 */
export type CreateConfigInstructionAccounts = {
  admin: web3.PublicKey
  config: web3.PublicKey
  devTreasury: web3.PublicKey
  daoTreasury: web3.PublicKey
  governanceTokenMint: web3.PublicKey
  tokenProgram?: web3.PublicKey
  associatedTokenProgram: web3.PublicKey
  systemProgram?: web3.PublicKey
}

export const createConfigInstructionDiscriminator = [
  201, 207, 243, 114, 75, 111, 47, 189,
]

/**
 * Creates a _CreateConfig_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category CreateConfig
 * @category generated
 */
export function createCreateConfigInstruction(
  accounts: CreateConfigInstructionAccounts,
  args: CreateConfigInstructionArgs,
  programId = new web3.PublicKey('44dSpmq2ATy23AiyouLCzsPgn12WeaTv8pi6ym5UHNGV')
) {
  const [data] = createConfigStruct.serialize({
    instructionDiscriminator: createConfigInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.admin,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.config,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.devTreasury,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.daoTreasury,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.governanceTokenMint,
      isWritable: true,
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
