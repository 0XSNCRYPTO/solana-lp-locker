import * as anchor from "@coral-xyz/anchor";
import { DasApiAsset } from "@metaplex-foundation/digital-asset-standard-api";
import {
  Account,
  getAccount,
  getAssociatedTokenAddressSync,
  getMint,
  Mint,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import Image from "next/image";
import Link from "next/link";
import { Authority, Lock } from "program";
import { ReactNode } from "react";
import { FaCalendar, FaExclamationCircle } from "react-icons/fa";
import { getPDAs } from "utils/constants";
import { getExplorerUrl } from "utils/explorer";
import { displayTime, shortenAddress } from "utils/formatters";

export class LockAccount {
  lockTokenAccount: Account;
  recipientTokenAccount: Account;
  funderTokenAccount: Account;
  mintInfo: Mint;

  // Lock properties
  id: PublicKey;
  funder: PublicKey;
  recipient: PublicKey;
  mint: PublicKey;
  cancelAuthority: Authority;
  changeRecipientAuthority: Authority;
  vestingDuration: anchor.BN;
  payoutInterval: anchor.BN;
  amountPerPayout: anchor.BN;
  startDate: anchor.BN;
  cliffPaymentAmount: anchor.BN;
  lastPaymentTimestamp: anchor.BN;
  isCliffPaymentDisbursed: boolean;
  name: string;
  das: DasApiAsset;

  constructor(
    lock: Lock,
    pubkey: PublicKey,
    public connection: Connection,
  ) {
    this.id = pubkey;
    this.funder = lock.funder;
    this.recipient = lock.recipient;
    this.mint = lock.mint;
    this.cancelAuthority = lock.cancelAuthority;
    this.changeRecipientAuthority = lock.changeRecipientAuthority;
    this.vestingDuration = new anchor.BN(lock.vestingDuration);
    this.payoutInterval = new anchor.BN(lock.payoutInterval);
    this.amountPerPayout = new anchor.BN(lock.amountPerPayout);
    this.startDate = new anchor.BN(lock.startDate);
    this.cliffPaymentAmount = new anchor.BN(lock.cliffPaymentAmount);
    this.lastPaymentTimestamp = new anchor.BN(lock.lastPaymentTimestamp);
    this.isCliffPaymentDisbursed = lock.isCliffPaymentDisbursed;
    this.name = anchor.utils.bytes.utf8.decode(new Uint8Array(lock.name));
  }

  async populateLock(connection: Connection, lock: Lock | LockAccount) {
    const [, , lockTokenAccount] = getPDAs(
      lock.funder,
      lock.recipient,
      lock.mint,
    );
    this.mintInfo = await getMint(
      connection,
      lock.mint,
      undefined,
      TOKEN_2022_PROGRAM_ID,
    );
    this.lockTokenAccount = await getAccount(
      connection,
      lockTokenAccount,
      undefined,
      TOKEN_2022_PROGRAM_ID,
    );
    this.recipientTokenAccount = await getAccount(
      connection,
      getAssociatedTokenAddressSync(
        lock.mint,
        lock.recipient,
        false,
        TOKEN_2022_PROGRAM_ID,
      ),
      undefined,
      TOKEN_2022_PROGRAM_ID,
    );
    this.funderTokenAccount = await getAccount(
      connection,
      getAssociatedTokenAddressSync(
        lock.mint,
        lock.funder,
        false,
        TOKEN_2022_PROGRAM_ID,
      ),
      undefined,
      TOKEN_2022_PROGRAM_ID,
    );
  }

  canChangeRecipient(user: PublicKey): boolean {
    switch (this.changeRecipientAuthority) {
      case Authority.Neither:
        return false;
      case Authority.Funder:
        return user.equals(this.funder);
      case Authority.Recipient:
        return user.equals(this.recipient);
      case Authority.Both:
        return user.equals(this.funder) || user.equals(this.recipient);
    }
  }

  canCancel(user: PublicKey): boolean {
    switch (this.cancelAuthority) {
      case Authority.Neither:
        return false;
      case Authority.Funder:
        return user.equals(this.funder);
      case Authority.Recipient:
        return user.equals(this.recipient);
      case Authority.Both:
        return user.equals(this.funder) || user.equals(this.recipient);
    }
  }

  displayTime(seconds: number): string {
    return displayTime(seconds);
  }

  get displayNextPayout(): ReactNode {
    const currentTimestamp = new anchor.BN(Math.floor(Date.now() / 1000));

    const lastPaymentTimestamp = this.lastPaymentTimestamp;
    const payoutInterval = this.payoutInterval;
    const nextPayoutTimestamp = lastPaymentTimestamp.add(payoutInterval);

    return (
      <div className="flex items-center gap-1">
        {nextPayoutTimestamp.toNumber() > currentTimestamp.toNumber() ? (
          `${new Date(nextPayoutTimestamp.toNumber() * 1000).toLocaleString()}`
        ) : (
          <button className="flex items-center gap-1 text-success">
            Now <FaExclamationCircle />
          </button>
        )}
      </div>
    );
  }

  get displayPayoutInterval(): ReactNode {
    return (
      <div className="flex items-center gap-1">
        {this.displayTime(this.payoutIntervalAsNumberInMilliseconds / 1000)}
      </div>
    );
  }

  get canMint(): boolean {
    return this.mintInfo.mintAuthority === null;
  }

  get canFreeze(): boolean {
    return this.mintInfo.freezeAuthority === null;
  }

  get displayFunder(): ReactNode {
    return (
      <Link
        className="link link-primary flex items-center gap-1"
        target="_blank"
        href={getExplorerUrl(this.connection.rpcEndpoint, this.funder)}
      >
        {shortenAddress(this.funder)}{" "}
        <Image src={"/solscan.png"} width={14} height={14} alt="solscan" />
      </Link>
    );
  }

  get displayRecipient(): ReactNode {
    return (
      <Link
        className="link link-primary flex items-center gap-1"
        target="_blank"
        href={getExplorerUrl(this.connection.rpcEndpoint, this.recipient)}
      >
        {shortenAddress(this.recipient)}{" "}
        <Image src={"/solscan.png"} width={14} height={14} alt="solscan" />
      </Link>
    );
  }

  get displayName(): ReactNode {
    return (
      <Link
        className="link link-primary flex items-center gap-1"
        target="_blank"
        href={getExplorerUrl(this.connection.rpcEndpoint, this.id)}
      >
        {this.name}{" "}
        <Image src={"/solscan.png"} width={14} height={14} alt="solscan" />
      </Link>
    );
  }

  get displayCancelAuthority(): ReactNode {
    switch (this.cancelAuthority) {
      case Authority.Funder:
        return (
          <Link
            className="link link-primary flex items-center gap-1"
            target="_blank"
            href={getExplorerUrl(this.connection.rpcEndpoint, this.funder)}
          >
            {shortenAddress(this.funder)}{" "}
            <Image src={"/solscan.png"} width={14} height={14} alt="solscan" />
          </Link>
        );
      case Authority.Recipient:
        return (
          <Link
            className="link link-primary flex items-center gap-1"
            target="_blank"
            href={getExplorerUrl(this.connection.rpcEndpoint, this.recipient)}
          >
            {shortenAddress(this.recipient)}{" "}
            <Image src={"/solscan.png"} width={14} height={14} alt="solscan" />
          </Link>
        );
      case Authority.Both:
        return (
          <div className="flex flex-col gap-1">
            <Link
              className="link link-primary flex items-center gap-1"
              target="_blank"
              href={getExplorerUrl(this.connection.rpcEndpoint, this.funder)}
            >
              {shortenAddress(this.funder)}{" "}
              <Image
                src={"/solscan.png"}
                width={14}
                height={14}
                alt="solscan"
              />
            </Link>

            <Link
              className="link link-primary flex items-center gap-1"
              target="_blank"
              href={getExplorerUrl(this.connection.rpcEndpoint, this.recipient)}
            >
              {shortenAddress(this.recipient)}{" "}
              <Image
                src={"/solscan.png"}
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

  get displayChangeRecipientAuthority(): ReactNode {
    switch (this.cancelAuthority) {
      case Authority.Funder:
        return (
          <Link
            className="link link-primary flex items-center gap-1"
            target="_blank"
            href={getExplorerUrl(this.connection.rpcEndpoint, this.funder)}
          >
            {shortenAddress(this.funder)}{" "}
            <Image src={"/solscan.png"} width={14} height={14} alt="solscan" />
          </Link>
        );
      case Authority.Recipient:
        return (
          <Link
            className="link link-primary flex items-center gap-1"
            target="_blank"
            href={getExplorerUrl(this.connection.rpcEndpoint, this.recipient)}
          >
            {shortenAddress(this.recipient)}{" "}
            <Image src={"/solscan.png"} width={14} height={14} alt="solscan" />
          </Link>
        );
      case Authority.Both:
        return (
          <div className="flex flex-col gap-1">
            <Link
              className="link link-primary flex items-center gap-1"
              target="_blank"
              href={getExplorerUrl(this.connection.rpcEndpoint, this.funder)}
            >
              {shortenAddress(this.funder)}{" "}
              <Image
                src={"/solscan.png"}
                width={14}
                height={14}
                alt="solscan"
              />
            </Link>

            <Link
              className="link link-primary flex items-center gap-1"
              target="_blank"
              href={getExplorerUrl(this.connection.rpcEndpoint, this.recipient)}
            >
              {shortenAddress(this.recipient)}{" "}
              <Image
                src={"/solscan.png"}
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

  get displayTokenMint(): ReactNode {
    return (
      <Link
        className="link link-primary flex items-center gap-1"
        target="_blank"
        href={getExplorerUrl(this.connection.rpcEndpoint, this.mint)}
      >
        {shortenAddress(this.mint)}{" "}
        <Image src={"/solscan.png"} width={14} height={14} alt="solscan" />
      </Link>
    );
  }

  get displayLockBalance(): ReactNode {
    return (
      <div className="flex items-center gap-1">
        {this.lockTokenAccountBalanceAsNumberPerDecimals.toLocaleString()}{" "}
        <Image src={"/LP.png"} width={14} height={14} alt="LP" />
      </div>
    );
  }

  get displayVestingEndDate(): ReactNode {
    const startDate = this.startDateAsDate;
    const endDate = new Date(
      startDate.getTime() + this.vestingDurationAsNumberInMilliseconds,
    );
    return (
      <div className="flex items-center gap-1">
        {endDate.toLocaleDateString()} <FaCalendar />
      </div>
    );
  }

  get displayCliffAmount(): ReactNode {
    return (
      <div className="flex items-center gap-1">
        {this.cliffPaymentAmountAsNumberPerDecimals.toLocaleString()}{" "}
      </div>
    );
  }

  get displayStartDate(): ReactNode {
    return (
      <div className="flex items-center gap-1">
        {this.startDateAsDate.toLocaleDateString()} <FaCalendar />
      </div>
    );
  }

  get canDisburse(): boolean {
    const currentTimestamp = new anchor.BN(Math.floor(Date.now() / 1000));

    const lastPaymentTimestamp = this.lastPaymentTimestamp;
    const payoutInterval = this.payoutInterval;
    const timeSinceLastPayment = currentTimestamp.sub(lastPaymentTimestamp);

    return timeSinceLastPayment.gte(payoutInterval);
  }

  get decimals(): number {
    return this.mintInfo?.decimals || 9;
  }

  get lockTokenAccountBalance(): anchor.BN {
    return new anchor.BN(this.lockTokenAccount?.amount.toString());
  }

  get lockTokenAccountBalanceAsNumberPerDecimals(): number {
    return this.lockTokenAccountBalance
      .div(new anchor.BN(Math.pow(10, this.decimals)))
      .toNumber();
  }

  get vestingDurationAsNumber(): number {
    return this.vestingDuration.toNumber();
  }

  get vestingDurationAsNumberInMilliseconds(): number {
    return this.vestingDurationAsNumber * 1000;
  }

  get payoutIntervalAsNumber(): number {
    return this.payoutInterval.toNumber();
  }

  get payoutIntervalAsNumberInMilliseconds(): number {
    return this.payoutIntervalAsNumber * 1000;
  }

  get amountPerPayoutAsNumberPerDecimals(): number {
    return this.amountPerPayout
      .div(new anchor.BN(Math.pow(10, this.decimals)))
      .toNumber();
  }

  get startDateAsNumberInSeconds(): number {
    return this.startDate.toNumber();
  }

  get startDateAsNumberInMilliseconds(): number {
    return this.startDateAsNumberInSeconds * 1000;
  }

  get startDateAsDate(): Date {
    return new Date(this.startDateAsNumberInMilliseconds);
  }

  get cliffPaymentAmountAsNumberPerDecimals(): number {
    return this.cliffPaymentAmount
      .div(new anchor.BN(Math.pow(10, this.decimals)))
      .toNumber();
  }

  get lastPaymentTimestampAsNumberInSeconds(): number {
    return this.lastPaymentTimestamp.toNumber();
  }

  get lastPaymentTimestampAsNumberInMilliseconds(): number {
    return this.lastPaymentTimestampAsNumberInSeconds * 1000;
  }

  get lastPaymentTimestampAsDate(): Date {
    return new Date(this.lastPaymentTimestampAsNumberInMilliseconds);
  }
}
