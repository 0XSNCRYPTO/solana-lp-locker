/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  Context,
  Pda,
  PublicKey,
  RpcAccount,
  RpcGetAccountOptions,
  RpcGetAccountsOptions,
  assertAccountExists,
  deserializeAccount,
  gpaBuilder,
  publicKey as toPublicKey,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  bool,
  publicKey as publicKeySerializer,
  struct,
  u64,
} from '@metaplex-foundation/umi/serializers';
import { Authority, AuthorityArgs, getAuthoritySerializer } from '../types';

export type Lock = Account<LockAccountData>;

export type LockAccountData = {
  funder: PublicKey;
  beneficiary: PublicKey;
  mint: PublicKey;
  cancelAuthority: Authority;
  changeRecipientAuthority: Authority;
  vestingDuration: bigint;
  payoutInterval: bigint;
  amountPerPayout: bigint;
  startDate: bigint;
  cliffPaymentAmount: bigint;
  lastPaymentTimestamp: bigint;
  cliffPaymentAmountPaid: boolean;
};

export type LockAccountDataArgs = {
  funder: PublicKey;
  beneficiary: PublicKey;
  mint: PublicKey;
  cancelAuthority: AuthorityArgs;
  changeRecipientAuthority: AuthorityArgs;
  vestingDuration: number | bigint;
  payoutInterval: number | bigint;
  amountPerPayout: number | bigint;
  startDate: number | bigint;
  cliffPaymentAmount: number | bigint;
  lastPaymentTimestamp: number | bigint;
  cliffPaymentAmountPaid: boolean;
};

export function getLockAccountDataSerializer(): Serializer<
  LockAccountDataArgs,
  LockAccountData
> {
  return struct<LockAccountData>(
    [
      ['funder', publicKeySerializer()],
      ['beneficiary', publicKeySerializer()],
      ['mint', publicKeySerializer()],
      ['cancelAuthority', getAuthoritySerializer()],
      ['changeRecipientAuthority', getAuthoritySerializer()],
      ['vestingDuration', u64()],
      ['payoutInterval', u64()],
      ['amountPerPayout', u64()],
      ['startDate', u64()],
      ['cliffPaymentAmount', u64()],
      ['lastPaymentTimestamp', u64()],
      ['cliffPaymentAmountPaid', bool()],
    ],
    { description: 'LockAccountData' }
  ) as Serializer<LockAccountDataArgs, LockAccountData>;
}

export function deserializeLock(rawAccount: RpcAccount): Lock {
  return deserializeAccount(rawAccount, getLockAccountDataSerializer());
}

export async function fetchLock(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<Lock> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  assertAccountExists(maybeAccount, 'Lock');
  return deserializeLock(maybeAccount);
}

export async function safeFetchLock(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<Lock | null> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  return maybeAccount.exists ? deserializeLock(maybeAccount) : null;
}

export async function fetchAllLock(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<Lock[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'Lock');
    return deserializeLock(maybeAccount);
  });
}

export async function safeFetchAllLock(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<Lock[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) => deserializeLock(maybeAccount as RpcAccount));
}

export function getLockGpaBuilder(context: Pick<Context, 'rpc' | 'programs'>) {
  const programId = context.programs.getPublicKey(
    'valhalla',
    'BgfvN8xjwoBD8YDvpDAFPZW6QxJeqrEZWvoXGg21PVzU'
  );
  return gpaBuilder(context, programId)
    .registerFields<{
      funder: PublicKey;
      beneficiary: PublicKey;
      mint: PublicKey;
      cancelAuthority: AuthorityArgs;
      changeRecipientAuthority: AuthorityArgs;
      vestingDuration: number | bigint;
      payoutInterval: number | bigint;
      amountPerPayout: number | bigint;
      startDate: number | bigint;
      cliffPaymentAmount: number | bigint;
      lastPaymentTimestamp: number | bigint;
      cliffPaymentAmountPaid: boolean;
    }>({
      funder: [0, publicKeySerializer()],
      beneficiary: [32, publicKeySerializer()],
      mint: [64, publicKeySerializer()],
      cancelAuthority: [96, getAuthoritySerializer()],
      changeRecipientAuthority: [97, getAuthoritySerializer()],
      vestingDuration: [98, u64()],
      payoutInterval: [106, u64()],
      amountPerPayout: [114, u64()],
      startDate: [122, u64()],
      cliffPaymentAmount: [130, u64()],
      lastPaymentTimestamp: [138, u64()],
      cliffPaymentAmountPaid: [146, bool()],
    })
    .deserializeUsing<Lock>((account) => deserializeLock(account));
}

export function getLockSize(): number {
  return 147;
}
