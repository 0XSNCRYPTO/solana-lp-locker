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
 * @category Close
 * @category generated
 */
export const closeStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'CloseInstructionArgs'
)
/**
 * Accounts required by the _close_ instruction
 *
 * @property [_writable_, **signer**] creator
 * @property [_writable_] vault
 * @property [_writable_] vaultAta
 * @property [] mint
 * @category Instructions
 * @category Close
 * @category generated
 */
export type CloseInstructionAccounts = {
  creator: web3.PublicKey
  vault: web3.PublicKey
  vaultAta: web3.PublicKey
  mint: web3.PublicKey
  tokenProgram?: web3.PublicKey
}

export const closeInstructionDiscriminator = [
  98, 165, 201, 177, 108, 65, 206, 96,
]

/**
 * Creates a _Close_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category Close
 * @category generated
 */
export function createCloseInstruction(
  accounts: CloseInstructionAccounts,
  programId = new web3.PublicKey('57Q3oV1buV8fLdvStfg5wsgGotgWc9k6doJd4QJzDVmU')
) {
  const [data] = closeStruct.serialize({
    instructionDiscriminator: closeInstructionDiscriminator,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.creator,
      isWritable: true,
      isSigner: true,
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
      pubkey: accounts.mint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenProgram ?? splToken.TOKEN_PROGRAM_ID,
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
