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
 * @category DisburseTokenLock
 * @category generated
 */
export const disburseTokenLockStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'DisburseTokenLockInstructionArgs'
)
/**
 * Accounts required by the _disburseTokenLock_ instruction
 *
 * @property [_writable_, **signer**] funder
 * @property [_writable_] funderTokenAccount
 * @property [_writable_] tokenLock
 * @property [_writable_] tokenLockTokenAccount
 * @property [] mint
 * @property [] associatedTokenProgram
 * @category Instructions
 * @category DisburseTokenLock
 * @category generated
 */
export type DisburseTokenLockInstructionAccounts = {
  funder: web3.PublicKey
  funderTokenAccount: web3.PublicKey
  tokenLock: web3.PublicKey
  tokenLockTokenAccount: web3.PublicKey
  mint: web3.PublicKey
  tokenProgram?: web3.PublicKey
  associatedTokenProgram: web3.PublicKey
  systemProgram?: web3.PublicKey
}

export const disburseTokenLockInstructionDiscriminator = [
  62, 255, 161, 205, 28, 242, 174, 40,
]

/**
 * Creates a _DisburseTokenLock_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category DisburseTokenLock
 * @category generated
 */
export function createDisburseTokenLockInstruction(
  accounts: DisburseTokenLockInstructionAccounts,
  programId = new web3.PublicKey('CpeQRExCTr7a6pzjF7mGsT6HZVpAM636xSUFC4STTJFn')
) {
  const [data] = disburseTokenLockStruct.serialize({
    instructionDiscriminator: disburseTokenLockInstructionDiscriminator,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.funder,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.funderTokenAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenLock,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenLockTokenAccount,
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
  ]

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  })
  return ix
}
