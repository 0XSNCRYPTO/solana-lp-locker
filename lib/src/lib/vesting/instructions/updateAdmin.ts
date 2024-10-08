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
 * @category UpdateAdmin
 * @category generated
 */
export const updateAdminStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'UpdateAdminInstructionArgs'
)
/**
 * Accounts required by the _updateAdmin_ instruction
 *
 * @property [_writable_, **signer**] admin
 * @property [] newAdmin
 * @property [_writable_] config
 * @category Instructions
 * @category UpdateAdmin
 * @category generated
 */
export type UpdateAdminInstructionAccounts = {
  admin: web3.PublicKey
  newAdmin: web3.PublicKey
  config: web3.PublicKey
}

export const updateAdminInstructionDiscriminator = [
  161, 176, 40, 213, 60, 184, 179, 228,
]

/**
 * Creates a _UpdateAdmin_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category UpdateAdmin
 * @category generated
 */
export function createUpdateAdminInstruction(
  accounts: UpdateAdminInstructionAccounts,
  programId = new web3.PublicKey('Ct63b5aLvhYT2bSvK3UG3oTJF8PgAC3MzDwpqXRKezF6')
) {
  const [data] = updateAdminStruct.serialize({
    instructionDiscriminator: updateAdminInstructionDiscriminator,
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
