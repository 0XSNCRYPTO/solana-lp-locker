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
 * Arguments used to create {@link Config}
 * @category Accounts
 * @category generated
 */
export type ConfigArgs = {
  admin: web3.PublicKey;
  devTreasury: web3.PublicKey;
  daoTreasury: web3.PublicKey;
  governanceTokenMintKey: web3.PublicKey;
  devFee: beet.bignum;
  autopayMultiplier: beet.bignum;
  tokenFeeBasisPoints: beet.bignum;
  governanceTokenAmount: beet.bignum;
};

export const configDiscriminator = [155, 12, 170, 224, 30, 250, 204, 130];
/**
 * Holds the data for the {@link Config} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class Config implements ConfigArgs {
  private constructor(
    readonly admin: web3.PublicKey,
    readonly devTreasury: web3.PublicKey,
    readonly daoTreasury: web3.PublicKey,
    readonly governanceTokenMintKey: web3.PublicKey,
    readonly devFee: beet.bignum,
    readonly autopayMultiplier: beet.bignum,
    readonly tokenFeeBasisPoints: beet.bignum,
    readonly governanceTokenAmount: beet.bignum
  ) {}

  /**
   * Creates a {@link Config} instance from the provided args.
   */
  static fromArgs(args: ConfigArgs) {
    return new Config(
      args.admin,
      args.devTreasury,
      args.daoTreasury,
      args.governanceTokenMintKey,
      args.devFee,
      args.autopayMultiplier,
      args.tokenFeeBasisPoints,
      args.governanceTokenAmount
    );
  }

  /**
   * Deserializes the {@link Config} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [Config, number] {
    return Config.deserialize(accountInfo.data, offset);
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Config} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<Config> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig
    );
    if (accountInfo == null) {
      throw new Error(`Unable to find Config account at ${address}`);
    }
    return Config.fromAccountInfo(accountInfo, 0)[0];
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey(
      "BBczhggWEH5Y5zZNJjgLDWhZhfaSjxm1TcLpYhB79RgY"
    )
  ) {
    return beetSolana.GpaBuilder.fromStruct(programId, configBeet);
  }

  /**
   * Deserializes the {@link Config} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [Config, number] {
    return configBeet.deserialize(buf, offset);
  }

  /**
   * Serializes the {@link Config} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return configBeet.serialize({
      accountDiscriminator: configDiscriminator,
      ...this,
    });
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Config}
   */
  static get byteSize() {
    return configBeet.byteSize;
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Config} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      Config.byteSize,
      commitment
    );
  }

  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link Config} data.
   */
  static hasCorrectByteSize(buf: Buffer, offset = 0) {
    return buf.byteLength - offset === Config.byteSize;
  }

  /**
   * Returns a readable version of {@link Config} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      admin: this.admin.toBase58(),
      devTreasury: this.devTreasury.toBase58(),
      daoTreasury: this.daoTreasury.toBase58(),
      governanceTokenMintKey: this.governanceTokenMintKey.toBase58(),
      devFee: (() => {
        const x = <{ toNumber: () => number }>this.devFee;
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      autopayMultiplier: (() => {
        const x = <{ toNumber: () => number }>this.autopayMultiplier;
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      tokenFeeBasisPoints: (() => {
        const x = <{ toNumber: () => number }>this.tokenFeeBasisPoints;
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      governanceTokenAmount: (() => {
        const x = <{ toNumber: () => number }>this.governanceTokenAmount;
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
export const configBeet = new beet.BeetStruct<
  Config,
  ConfigArgs & {
    accountDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ["accountDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)],
    ["admin", beetSolana.publicKey],
    ["devTreasury", beetSolana.publicKey],
    ["daoTreasury", beetSolana.publicKey],
    ["governanceTokenMintKey", beetSolana.publicKey],
    ["devFee", beet.u64],
    ["autopayMultiplier", beet.u64],
    ["tokenFeeBasisPoints", beet.u64],
    ["governanceTokenAmount", beet.u64],
  ],
  Config.fromArgs,
  "Config"
);
