/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from "@solana/web3.js";
import * as beet from "@metaplex-foundation/beet";
import * as beetSolana from "@metaplex-foundation/beet-solana";

/**
 * Arguments used to create {@link Locker}
 * @category Accounts
 * @category generated
 */
export type LockerArgs = {
  admin: web3.PublicKey;
  treasury: web3.PublicKey;
  fee: beet.bignum;
};

export const lockerDiscriminator = [74, 246, 6, 113, 249, 228, 75, 169];
/**
 * Holds the data for the {@link Locker} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class Locker implements LockerArgs {
  private constructor(
    readonly admin: web3.PublicKey,
    readonly treasury: web3.PublicKey,
    readonly fee: beet.bignum
  ) {}

  /**
   * Creates a {@link Locker} instance from the provided args.
   */
  static fromArgs(args: LockerArgs) {
    return new Locker(args.admin, args.treasury, args.fee);
  }

  /**
   * Deserializes the {@link Locker} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [Locker, number] {
    return Locker.deserialize(accountInfo.data, offset);
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Locker} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<Locker> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig
    );
    if (accountInfo == null) {
      throw new Error(`Unable to find Locker account at ${address}`);
    }
    return Locker.fromAccountInfo(accountInfo, 0)[0];
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey(
      "5KUhgizPG5tiJpfzEpv1JubQsae6suZf5GKZyqDXqeoJ"
    )
  ) {
    return beetSolana.GpaBuilder.fromStruct(programId, lockerBeet);
  }

  /**
   * Deserializes the {@link Locker} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [Locker, number] {
    return lockerBeet.deserialize(buf, offset);
  }

  /**
   * Serializes the {@link Locker} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return lockerBeet.serialize({
      accountDiscriminator: lockerDiscriminator,
      ...this,
    });
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Locker}
   */
  static get byteSize() {
    return lockerBeet.byteSize;
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Locker} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      Locker.byteSize,
      commitment
    );
  }

  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link Locker} data.
   */
  static hasCorrectByteSize(buf: Buffer, offset = 0) {
    return buf.byteLength - offset === Locker.byteSize;
  }

  /**
   * Returns a readable version of {@link Locker} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      admin: this.admin.toBase58(),
      treasury: this.treasury.toBase58(),
      fee: (() => {
        const x = <{ toNumber: () => number }>this.fee;
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
    };
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const lockerBeet = new beet.BeetStruct<
  Locker,
  LockerArgs & {
    accountDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ["accountDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)],
    ["admin", beetSolana.publicKey],
    ["treasury", beetSolana.publicKey],
    ["fee", beet.u64],
  ],
  Locker.fromArgs,
  "Locker"
);
