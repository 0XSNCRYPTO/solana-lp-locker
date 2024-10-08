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
 * @category UpdateDevFee
 * @category generated
 */
export type UpdateDevFeeInstructionArgs = {
  devFee: beet.bignum
}
/**
 * @category Instructions
 * @category UpdateDevFee
 * @category generated
 */
export const updateDevFeeStruct = new beet.BeetArgsStruct<
  UpdateDevFeeInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['devFee', beet.u64],
  ],
  'UpdateDevFeeInstructionArgs'
)
/**
 * Accounts required by the _updateDevFee_ instruction
 *
 * @property [_writable_, **signer**] admin
 * @property [_writable_] config
 * @category Instructions
 * @category UpdateDevFee
 * @category generated
 */
export type UpdateDevFeeInstructionAccounts = {
  admin: web3.PublicKey
  config: web3.PublicKey
}

export const updateDevFeeInstructionDiscriminator = [
  170, 152, 29, 116, 61, 77, 221, 81,
]

/**
 * Creates a _UpdateDevFee_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category UpdateDevFee
 * @category generated
 */
export function createUpdateDevFeeInstruction(
  accounts: UpdateDevFeeInstructionAccounts,
  args: UpdateDevFeeInstructionArgs,
  programId = new web3.PublicKey('Ct63b5aLvhYT2bSvK3UG3oTJF8PgAC3MzDwpqXRKezF6')
) {
  const [data] = updateDevFeeStruct.serialize({
    instructionDiscriminator: updateDevFeeInstructionDiscriminator,
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
  ]

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  })
  return ix
}
