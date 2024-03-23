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
 * @category UpdateDaoTreasury
 * @category generated
 */
export const updateDaoTreasuryStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'UpdateDaoTreasuryInstructionArgs'
)
/**
 * Accounts required by the _updateDaoTreasury_ instruction
 *
 * @property [_writable_, **signer**] admin
 * @property [] newDaoTreasury
 * @property [_writable_] config
 * @category Instructions
 * @category UpdateDaoTreasury
 * @category generated
 */
export type UpdateDaoTreasuryInstructionAccounts = {
  admin: web3.PublicKey
  newDaoTreasury: web3.PublicKey
  config: web3.PublicKey
}

export const updateDaoTreasuryInstructionDiscriminator = [
  50, 210, 233, 46, 9, 38, 87, 196,
]

/**
 * Creates a _UpdateDaoTreasury_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category UpdateDaoTreasury
 * @category generated
 */
export function createUpdateDaoTreasuryInstruction(
  accounts: UpdateDaoTreasuryInstructionAccounts,
  programId = new web3.PublicKey('8eqnKMrBM7kk73d7U4UDVzn9SFX9o8nE1woX6x6nAkgP')
) {
  const [data] = updateDaoTreasuryStruct.serialize({
    instructionDiscriminator: updateDaoTreasuryInstructionDiscriminator,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.admin,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.newDaoTreasury,
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
