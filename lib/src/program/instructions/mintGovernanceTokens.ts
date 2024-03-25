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
 * @category MintGovernanceTokens
 * @category generated
 */
export type MintGovernanceTokensInstructionArgs = {
  amount: beet.bignum
}
/**
 * @category Instructions
 * @category MintGovernanceTokens
 * @category generated
 */
export const mintGovernanceTokensStruct = new beet.BeetArgsStruct<
  MintGovernanceTokensInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['amount', beet.u64],
  ],
  'MintGovernanceTokensInstructionArgs'
)
/**
 * Accounts required by the _mintGovernanceTokens_ instruction
 *
 * @property [_writable_, **signer**] admin
 * @property [_writable_] receiver
 * @property [_writable_] config
 * @property [_writable_] governanceTokenMint
 * @property [_writable_] receiverTokenAccount
 * @property [] associatedTokenProgram
 * @category Instructions
 * @category MintGovernanceTokens
 * @category generated
 */
export type MintGovernanceTokensInstructionAccounts = {
  admin: web3.PublicKey
  receiver: web3.PublicKey
  config: web3.PublicKey
  governanceTokenMint: web3.PublicKey
  receiverTokenAccount: web3.PublicKey
  tokenProgram?: web3.PublicKey
  associatedTokenProgram: web3.PublicKey
  systemProgram?: web3.PublicKey
}

export const mintGovernanceTokensInstructionDiscriminator = [
  34, 236, 35, 108, 203, 108, 129, 215,
]

/**
 * Creates a _MintGovernanceTokens_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category MintGovernanceTokens
 * @category generated
 */
export function createMintGovernanceTokensInstruction(
  accounts: MintGovernanceTokensInstructionAccounts,
  args: MintGovernanceTokensInstructionArgs,
  programId = new web3.PublicKey('CaynZZxoLCM8zJjnrC1KGv3R4X2BCzaSynkVRSJgbLdC')
) {
  const [data] = mintGovernanceTokensStruct.serialize({
    instructionDiscriminator: mintGovernanceTokensInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.admin,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.receiver,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.config,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.governanceTokenMint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.receiverTokenAccount,
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
