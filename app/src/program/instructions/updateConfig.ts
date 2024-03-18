/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'

/**
 * @category Instructions
 * @category UpdateConfig
 * @category generated
 */
export type UpdateConfigInstructionArgs = {
  newSolFee: beet.bignum
  newTokenFeeBasisPoints: beet.bignum
  newGovernanceTokenAmount: beet.bignum
}
/**
 * @category Instructions
 * @category UpdateConfig
 * @category generated
 */
export const updateConfigStruct = new beet.BeetArgsStruct<
  UpdateConfigInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['newSolFee', beet.u64],
    ['newTokenFeeBasisPoints', beet.u64],
    ['newGovernanceTokenAmount', beet.u64],
  ],
  'UpdateConfigInstructionArgs'
)
/**
 * Accounts required by the _updateConfig_ instruction
 *
 * @property [_writable_, **signer**] admin
 * @property [] newAdmin
 * @property [] newTokenTreasury
 * @property [_writable_] config
 * @category Instructions
 * @category UpdateConfig
 * @category generated
 */
export type UpdateConfigInstructionAccounts = {
  admin: web3.PublicKey
  newAdmin: web3.PublicKey
  newTokenTreasury: web3.PublicKey
  config: web3.PublicKey
}

export const updateConfigInstructionDiscriminator = [
  29, 158, 252, 191, 10, 83, 219, 99,
]

/**
 * Creates a _UpdateConfig_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category UpdateConfig
 * @category generated
 */
export function createUpdateConfigInstruction(
  accounts: UpdateConfigInstructionAccounts,
  args: UpdateConfigInstructionArgs,
  programId = new web3.PublicKey('8ND4DBYFa2nmoptLTfqfetHyh7r76xLFf7jn4LRD84Ts')
) {
  const [data] = updateConfigStruct.serialize({
    instructionDiscriminator: updateConfigInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.admin,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.newAdmin,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.newTokenTreasury,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.config,
      isWritable: true,
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
