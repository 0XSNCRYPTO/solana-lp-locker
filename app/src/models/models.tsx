import * as anchor from "@coral-xyz/anchor";

import {
  Account,
  Mint,
  TOKEN_2022_PROGRAM_ID,
  getAccount,
  getAssociatedTokenAddressSync,
  getMint,
} from "@solana/spl-token";
import {
  Authority,
  ScheduledPayment,
  TokenLock,
  VestingSchedule,
  VestingType,
} from "program";
import { Connection, PublicKey } from "@solana/web3.js";
import { displayTime, shortenAddress, shortenNumber } from "utils/formatters";

import { DasApiAsset } from "@metaplex-foundation/digital-asset-standard-api";
import { FaCalendar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { getExplorerUrl } from "utils/explorer";
import { getPDAs } from "utils/constants";
import lp from "../assets/LP.png";
import solscan from "../assets/solscan.png";

export default class BaseModel {
  cancelAuthority: Authority;
  changeRecipientAuthority: Authority;
  cliffPaymentAmount: anchor.BN = new anchor.BN(0);
  das: DasApiAsset;
  creator: PublicKey;
  creatorTokenAccount: Account;
  id: PublicKey;
  isCliffPaymentDisbursed: boolean;
  lastPaymentTimestamp: anchor.BN = new anchor.BN(0);
  mint: PublicKey;
  mintInfo: Mint;
  name: string;
  payoutInterval: anchor.BN = new anchor.BN(0);
  recipient: PublicKey;
  recipientTokenAccount: Account;
  startDate: anchor.BN = new anchor.BN(0);
  tokenAccount: Account;
  totalVestingDuration: anchor.BN = new anchor.BN(0);
  vestingType: VestingType;

  constructor(
    publicKey: PublicKey,
    obj: VestingSchedule | ScheduledPayment | TokenLock,
    public connection: anchor.web3.Connection,
  ) {
    this.id = publicKey;
    this.creator = obj.creator;
    this.mint = obj.mint;
    this.name = anchor.utils.bytes.utf8.decode(new Uint8Array(obj.name));
    this.totalVestingDuration = new anchor.BN(obj.totalVestingDuration);
    this.vestingType = obj.vestingType;

    if (obj instanceof VestingSchedule || obj instanceof ScheduledPayment) {
      this.cancelAuthority = obj.cancelAuthority;
      this.changeRecipientAuthority = obj.changeRecipientAuthority;
      this.recipient = obj.recipient;
    }

    if (obj instanceof ScheduledPayment || obj instanceof TokenLock) {
      this.startDate = new anchor.BN(obj.createdTimestamp);
    }

    if (obj instanceof VestingSchedule) {
      this.lastPaymentTimestamp = new anchor.BN(obj.lastPaymentTimestamp);
      this.payoutInterval = new anchor.BN(obj.payoutInterval);
      this.startDate = new anchor.BN(obj.startDate);
      this.cliffPaymentAmount = new anchor.BN(obj.cliffPaymentAmount);
      this.isCliffPaymentDisbursed = obj.isCliffPaymentDisbursed;
    }
  }

  get decimals(): number {
    return this.mintInfo?.decimals;
  }

  get canMint(): boolean {
    return this.mintInfo?.mintAuthority === null;
  }

  get canFreeze(): boolean {
    return this.mintInfo?.freezeAuthority === null;
  }

  get canDisburse(): boolean {
    const currentTime = Math.floor(Date.now() / 1000);
    const startDate = this.startDate.toNumber();
    if (startDate < currentTime) {
      switch (this.vestingType) {
        case VestingType.VestingSchedule:
          return (
            this.payoutInterval.toNumber() +
              this.lastPaymentTimestamp.toNumber() <
            currentTime
          );
        case VestingType.ScheduledPayment:
        case VestingType.TokenLock:
          return startDate + this.totalVestingDuration.toNumber() < currentTime;
      }
    }

    return false;
  }

  get tokenAccountBalance(): anchor.BN {
    return new anchor.BN(this.tokenAccount?.amount.toString());
  }

  get tokenAccountBalanceAsNumberPerDecimals(): number {
    return (
      this.tokenAccountBalance &&
      this.tokenAccountBalance
        .div(new anchor.BN(Math.pow(10, this.decimals)))
        .toNumber()
    );
  }

  get creatorDisplay(): ReactNode {
    return (
      <Link
        className="link link-secondary flex items-center gap-1"
        target="_blank"
        href={getExplorerUrl(this.connection.rpcEndpoint, this.creator)}
      >
        {shortenAddress(this.creator)}{" "}
        <Image
          placeholder="blur"
          src={solscan}
          width={14}
          height={14}
          alt="solscan"
        />
      </Link>
    );
  }

  get recipientDisplay(): ReactNode {
    return this.recipient ? (
      <Link
        className="link link-secondary flex items-center gap-1"
        target="_blank"
        href={getExplorerUrl(this.connection.rpcEndpoint, this.recipient)}
      >
        {shortenAddress(this.recipient)}{" "}
        <Image
          placeholder="blur"
          src={solscan}
          width={14}
          height={14}
          alt="solscan"
        />
      </Link>
    ) : (
      <Link
        className="link link-secondary flex items-center gap-1"
        target="_blank"
        href={getExplorerUrl(this.connection.rpcEndpoint, this.creator)}
      >
        {shortenAddress(this.creator)}{" "}
        <Image
          placeholder="blur"
          src={solscan}
          width={14}
          height={14}
          alt="solscan"
        />
      </Link>
    );
  }

  get payoutIntervalDisplay(): ReactNode {
    return (
      <div className="flex items-center gap-1">
        {this.payoutInterval.toNumber() === 0
          ? "No interval"
          : this.displayTime(this.payoutInterval.toNumber())}{" "}
        <FaCalendar />
      </div>
    );
  }

  get cliffPaymentAmountDisplay(): ReactNode {
    return shortenNumber(
      this.cliffPaymentAmount
        .div(new anchor.BN(10 ** this.mintInfo?.decimals))
        .toNumber(),
      4,
    );
  }

  get nameDisplay(): ReactNode {
    return (
      <Link
        className="link link-secondary flex items-center gap-1"
        target="_blank"
        href={`/vesting/${this.id.toBase58()}`}
      >
        {this.name}{" "}
      </Link>
    );
  }

  get cancelAuthorityDisplay(): ReactNode {
    switch (this.cancelAuthority) {
      case Authority.Creator:
        return (
          <Link
            className="link link-secondary flex items-center gap-1"
            target="_blank"
            href={getExplorerUrl(this.connection.rpcEndpoint, this.creator)}
          >
            {shortenAddress(this.creator)}{" "}
            <Image
              placeholder="blur"
              src={solscan}
              width={14}
              height={14}
              alt="solscan"
            />
          </Link>
        );
      case Authority.Recipient:
        return (
          <Link
            className="link link-secondary flex items-center gap-1"
            target="_blank"
            href={getExplorerUrl(this.connection.rpcEndpoint, this.recipient)}
          >
            {shortenAddress(this.recipient)}{" "}
            <Image
              placeholder="blur"
              src={solscan}
              width={14}
              height={14}
              alt="solscan"
            />
          </Link>
        );
      case Authority.Both:
        return (
          <div className="flex flex-col gap-1">
            <Link
              className="link link-secondary flex items-center gap-1"
              target="_blank"
              href={getExplorerUrl(this.connection.rpcEndpoint, this.creator)}
            >
              {shortenAddress(this.creator)}{" "}
              <Image
                placeholder="blur"
                src={solscan}
                width={14}
                height={14}
                alt="solscan"
              />
            </Link>

            <Link
              className="link link-secondary flex items-center gap-1"
              target="_blank"
              href={getExplorerUrl(this.connection.rpcEndpoint, this.recipient)}
            >
              {shortenAddress(this.recipient)}{" "}
              <Image
                placeholder="blur"
                src={solscan}
                width={14}
                height={14}
                alt="solscan"
              />
            </Link>
          </div>
        );

      default:
        return "No one";
    }
  }

  get changeRecipientAuthorityDisplay(): ReactNode {
    switch (this.cancelAuthority) {
      case Authority.Creator:
        return (
          <Link
            className="link link-secondary flex items-center gap-1"
            target="_blank"
            href={getExplorerUrl(this.connection.rpcEndpoint, this.creator)}
          >
            {shortenAddress(this.creator)}{" "}
            <Image
              placeholder="blur"
              src={solscan}
              width={14}
              height={14}
              alt="solscan"
            />
          </Link>
        );
      case Authority.Recipient:
        return (
          <Link
            className="link link-secondary flex items-center gap-1"
            target="_blank"
            href={getExplorerUrl(this.connection.rpcEndpoint, this.recipient)}
          >
            {shortenAddress(this.recipient)}{" "}
            <Image
              placeholder="blur"
              src={solscan}
              width={14}
              height={14}
              alt="solscan"
            />
          </Link>
        );
      case Authority.Both:
        return (
          <div className="flex flex-col gap-1">
            <Link
              className="link link-secondary flex items-center gap-1"
              target="_blank"
              href={getExplorerUrl(this.connection.rpcEndpoint, this.creator)}
            >
              {shortenAddress(this.creator)}{" "}
              <Image
                placeholder="blur"
                src={solscan}
                width={14}
                height={14}
                alt="solscan"
              />
            </Link>

            <Link
              className="link link-secondary flex items-center gap-1"
              target="_blank"
              href={getExplorerUrl(this.connection.rpcEndpoint, this.recipient)}
            >
              {shortenAddress(this.recipient)}{" "}
              <Image
                placeholder="blur"
                src={solscan}
                width={14}
                height={14}
                alt="solscan"
              />
            </Link>
          </div>
        );

      default:
        return "No one";
    }
  }

  get tokenMintDisplay(): ReactNode {
    return (
      <Link
        className="link link-secondary flex items-center gap-1"
        target="_blank"
        href={getExplorerUrl(this.connection.rpcEndpoint, this.mint)}
      >
        {shortenAddress(this.mint)}{" "}
        <Image
          placeholder="blur"
          src={solscan}
          width={14}
          height={14}
          alt="solscan"
        />
      </Link>
    );
  }

  get balanceDisplay(): ReactNode {
    return (
      <div className="flex items-center gap-1">
        {shortenNumber(this.tokenAccountBalanceAsNumberPerDecimals, 4)}{" "}
        <Image placeholder="blur" src={lp} width={14} height={14} alt="LP" />
      </div>
    );
  }

  get startDateDisplay(): ReactNode {
    return (
      <div className="flex items-center gap-1">
        {new Date(this.startDate.toNumber() * 1000).toLocaleDateString()}{" "}
        <FaCalendar />
      </div>
    );
  }

  get endDate(): Date {
    const startDate = new Date(this.startDate.toNumber() * 1000);
    return new Date(
      startDate.getTime() + this.totalVestingDuration.toNumber() * 1000,
    );
  }

  get endDateDisplay(): ReactNode {
    const startDate = new Date(this.startDate.toNumber() * 1000);
    const endDate = new Date(
      startDate.getTime() + this.totalVestingDuration.toNumber() * 1000,
    );
    return (
      <div className="flex items-center gap-1">
        {endDate.toLocaleDateString()} <FaCalendar />
      </div>
    );
  }

  get nextPayoutDate(): Date {
    switch (this.vestingType) {
      case VestingType.VestingSchedule:
        return new Date(
          this.lastPaymentTimestamp.toNumber() * 1000 +
            this.payoutInterval.toNumber() * 1000,
        );

      case VestingType.ScheduledPayment:
      case VestingType.TokenLock:
        return this.endDate;
    }
  }

  get nextPayoutDisplay(): string {
    return this.nextPayoutDate.toLocaleString();
  }

  get nextPayoutDisplayShort(): string {
    return this.nextPayoutDate.toLocaleDateString();
  }

  displayTime(seconds: number): string {
    return displayTime(seconds);
  }

  canChangeRecipient(user: PublicKey): boolean {
    switch (this.changeRecipientAuthority) {
      case Authority.Neither:
        return false;
      case Authority.Creator:
        return user.equals(this.creator);
      case Authority.Recipient:
        return user.equals(this.recipient);
      case Authority.Both:
        return user.equals(this.creator) || user.equals(this.recipient);
    }
  }

  canCancel(user: PublicKey): boolean {
    switch (this.cancelAuthority) {
      case Authority.Neither:
        return false;
      case Authority.Creator:
        return user.equals(this.creator);
      case Authority.Recipient:
        return user.equals(this.recipient);
      case Authority.Both:
        return user.equals(this.creator) || user.equals(this.recipient);
    }
  }

  async populate(connection: Connection, obj: BaseModel) {
    if (obj.recipient) {
      const pdas = getPDAs(obj.creator, obj.recipient, obj.mint);
      this.mintInfo = await getMint(
        connection,
        obj.mint,
        undefined,
        TOKEN_2022_PROGRAM_ID,
      );

      this.tokenAccount = await getAccount(
        connection,
        pdas.vestingScheduleTokenAccount,
        undefined,
        TOKEN_2022_PROGRAM_ID,
      );

      this.recipientTokenAccount = await getAccount(
        connection,
        getAssociatedTokenAddressSync(
          obj.mint,
          obj.recipient,
          false,
          TOKEN_2022_PROGRAM_ID,
        ),
        undefined,
        TOKEN_2022_PROGRAM_ID,
      );

      this.creatorTokenAccount = await getAccount(
        connection,
        getAssociatedTokenAddressSync(
          obj.mint,
          obj.creator,
          false,
          TOKEN_2022_PROGRAM_ID,
        ),
        undefined,
        TOKEN_2022_PROGRAM_ID,
      );
    } else {
      const pdas = getPDAs(obj.creator, null, obj.mint);
      this.mintInfo = await getMint(
        connection,
        obj.mint,
        undefined,
        TOKEN_2022_PROGRAM_ID,
      );

      const destination =
        this.vestingType === VestingType.VestingSchedule
          ? pdas.vestingScheduleTokenAccount
          : this.vestingType === VestingType.TokenLock
            ? pdas.tokenLockTokenAccount
            : pdas.scheduledPaymentTokenAccount;
      this.tokenAccount = await getAccount(
        connection,
        destination,
        undefined,
        TOKEN_2022_PROGRAM_ID,
      );

      this.creatorTokenAccount = await getAccount(
        connection,
        getAssociatedTokenAddressSync(
          obj.mint,
          obj.creator,
          false,
          TOKEN_2022_PROGRAM_ID,
        ),
        undefined,
        TOKEN_2022_PROGRAM_ID,
      );
    }
  }
}

export class VestingScheduleAccount extends BaseModel {
  constructor(
    publicKey: PublicKey,
    scheduledPayment: VestingSchedule,
    public connection: Connection,
  ) {
    super(publicKey, scheduledPayment, connection);
  }
}

export class TokenLockAccount extends BaseModel {
  constructor(
    publicKey: PublicKey,
    scheduledPayment: TokenLock,
    public connection: Connection,
  ) {
    super(publicKey, scheduledPayment, connection);
  }
}

export class ScheduledPaymentAccount extends BaseModel {
  constructor(
    publicKey: PublicKey,
    scheduledPayment: ScheduledPayment,
    public connection: Connection,
  ) {
    super(publicKey, scheduledPayment, connection);
  }
}
