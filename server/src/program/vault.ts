import * as beet from "@metaplex-foundation/beet";
import * as beetSolana from "@metaplex-foundation/beet-solana";
import * as web3 from "@solana/web3.js";

/**
 * @category enums
 * @category generated
 */
export enum Authority {
  Neither,
  Creator,
  Recipient,
  Both,
}

/**
 * @category userTypes
 * @category generated
 */
export const authorityBeet = beet.fixedScalarEnum(
  Authority,
) as beet.FixedSizeBeet<Authority, Authority>;

/**
 * Arguments used to create {@link Vault}
 * @category Accounts
 * @category generated
 */
export interface VaultArgs {
  identifier: beet.bignum;
  name: number[] /* size: 32 */;
  creator: web3.PublicKey;
  recipient: web3.PublicKey;
  mint: web3.PublicKey;
  totalVestingDuration: beet.bignum;
  createdTimestamp: beet.bignum;
  startDate: beet.bignum;
  lastPaymentTimestamp: beet.bignum;
  initialDepositAmount: beet.bignum;
  totalNumberOfPayouts: beet.bignum;
  payoutInterval: beet.bignum;
  numberOfPaymentsMade: beet.bignum;
  cancelAuthority: Authority;
  autopay: boolean;
  tokenAccountBump: number;
}

export const vaultDiscriminator = [211, 8, 232, 43, 2, 152, 117, 119];
/**
 * Holds the data for the {@link Vault} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class Vault implements VaultArgs {
  private constructor(
    readonly identifier: beet.bignum,
    readonly name: number[] /* size: 32 */,
    readonly creator: web3.PublicKey,
    readonly recipient: web3.PublicKey,
    readonly mint: web3.PublicKey,
    readonly totalVestingDuration: beet.bignum,
    readonly createdTimestamp: beet.bignum,
    readonly startDate: beet.bignum,
    readonly lastPaymentTimestamp: beet.bignum,
    readonly initialDepositAmount: beet.bignum,
    readonly totalNumberOfPayouts: beet.bignum,
    readonly payoutInterval: beet.bignum,
    readonly numberOfPaymentsMade: beet.bignum,
    readonly cancelAuthority: Authority,
    readonly autopay: boolean,
    readonly tokenAccountBump: number,
  ) {}

  /**
   * Creates a {@link Vault} instance from the provided args.
   */
  static fromArgs(args: VaultArgs): Vault {
    return new Vault(
      args.identifier,
      args.name,
      args.creator,
      args.recipient,
      args.mint,
      args.totalVestingDuration,
      args.createdTimestamp,
      args.startDate,
      args.lastPaymentTimestamp,
      args.initialDepositAmount,
      args.totalNumberOfPayouts,
      args.payoutInterval,
      args.numberOfPaymentsMade,
      args.cancelAuthority,
      args.autopay,
      args.tokenAccountBump,
    );
  }

  /**
   * Deserializes the {@link Vault} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0,
  ): [Vault, number] {
    return Vault.deserialize(accountInfo.data, offset);
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Vault} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig,
  ): Promise<Vault> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig,
    );
    if (accountInfo == null) {
      throw new Error(`Unable to find Vault account at ${address.toBase58()}`);
    }
    return Vault.fromAccountInfo(accountInfo, 0)[0];
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey(
      "57Q3oV1buV8fLdvStfg5wsgGotgWc9k6doJd4QJzDVmU",
    ),
  ): beetSolana.GpaBuilder<
    VaultArgs & { accountDiscriminator: number[] /* size: 8 */ }
  > {
    return beetSolana.GpaBuilder.fromStruct(programId, vaultBeet);
  }

  /**
   * Deserializes the {@link Vault} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [Vault, number] {
    return vaultBeet.deserialize(buf, offset);
  }

  /**
   * Serializes the {@link Vault} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return vaultBeet.serialize({
      accountDiscriminator: vaultDiscriminator,
      ...this,
    });
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Vault}
   */
  static get byteSize(): number {
    return vaultBeet.byteSize;
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Vault} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    connection: web3.Connection,
    commitment?: web3.Commitment,
  ): Promise<number> {
    return await connection.getMinimumBalanceForRentExemption(
      Vault.byteSize,
      commitment,
    );
  }

  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link Vault} data.
   */
  static hasCorrectByteSize(buf: Buffer, offset = 0): boolean {
    return buf.byteLength - offset === Vault.byteSize;
  }

  /**
   * Returns a readable version of {@link Vault} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty(): any {
    return {
      identifier: (() => {
        const x = this.identifier as { toNumber: () => number };
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      name: this.name,
      creator: this.creator.toBase58(),
      recipient: this.recipient.toBase58(),
      mint: this.mint.toBase58(),
      totalVestingDuration: (() => {
        const x = this.totalVestingDuration as { toNumber: () => number };
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      createdTimestamp: (() => {
        const x = this.createdTimestamp as { toNumber: () => number };
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      startDate: (() => {
        const x = this.startDate as { toNumber: () => number };
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      lastPaymentTimestamp: (() => {
        const x = this.lastPaymentTimestamp as { toNumber: () => number };
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      initialDepositAmount: (() => {
        const x = this.initialDepositAmount as { toNumber: () => number };
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      totalNumberOfPayouts: (() => {
        const x = this.totalNumberOfPayouts as { toNumber: () => number };
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      payoutInterval: (() => {
        const x = this.payoutInterval as { toNumber: () => number };
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      numberOfPaymentsMade: (() => {
        const x = this.numberOfPaymentsMade as { toNumber: () => number };
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      cancelAuthority: "Authority." + Authority[this.cancelAuthority],
      autopay: this.autopay,
      tokenAccountBump: this.tokenAccountBump,
    };
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const vaultBeet = new beet.BeetStruct<
  Vault,
  VaultArgs & {
    accountDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ["accountDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)],
    ["identifier", beet.u64],
    ["name", beet.uniformFixedSizeArray(beet.u8, 32)],
    ["creator", beetSolana.publicKey],
    ["recipient", beetSolana.publicKey],
    ["mint", beetSolana.publicKey],
    ["totalVestingDuration", beet.u64],
    ["createdTimestamp", beet.u64],
    ["startDate", beet.u64],
    ["lastPaymentTimestamp", beet.u64],
    ["initialDepositAmount", beet.u64],
    ["totalNumberOfPayouts", beet.u64],
    ["payoutInterval", beet.u64],
    ["numberOfPaymentsMade", beet.u64],
    ["cancelAuthority", authorityBeet],
    ["autopay", beet.bool],
    ["tokenAccountBump", beet.u8],
  ],
  // eslint-disable-next-line @typescript-eslint/unbound-method
  Vault.fromArgs,
  "Vault",
);
