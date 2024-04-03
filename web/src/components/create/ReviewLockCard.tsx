import { Authority, shortenNumber } from "@valhalla/lib";
import { IconCircleCheck, IconCoin } from "@tabler/icons-react";

import CancelAuthorityDisplay from "../lock/CancelAuthorityDisplay";
import { DasApiAsset } from "@metaplex-foundation/digital-asset-standard-api";
import EndDateDisplay from "../lock/EndDateDisplay";
import Link from "next/link";
import PayoutIntervalDisplay from "../lock/PayoutIntervalDisplay";
import { PublicKey } from "@solana/web3.js";
import RecipientDisplay from "../lock/RecipientDisplay";
import StartDateDisplay from "../lock/StartDateDisplay";
import TokenMintDisplay from "../lock/TokenMintDisplay";
import { getExplorerUrl } from "@/src/utils/explorer";
import { useMemo } from "react";
import useProgram from "@/src/hooks/useProgram";

interface ReviewLockCardProps {
  creator: PublicKey;
  recipient: PublicKey | null;
  selectedToken?: DasApiAsset | null;
  totalVestingDuration: number;
  amountToBeVested: number;
  payoutInterval: number;
  startDate: Date;
  vestingEndDate: Date;
  cancelAuthority: Authority;
  isSubmitting: boolean;
  autopay: boolean;
}

export default function ReviewLockCard({
  creator,
  recipient,
  selectedToken,
  totalVestingDuration,
  amountToBeVested,
  payoutInterval,
  startDate,
  cancelAuthority,
  vestingEndDate,
  autopay,
}: ReviewLockCardProps) {
  const { connection } = useProgram();

  const authority = useMemo(() => cancelAuthority, [cancelAuthority]);

  const displayAmount = useMemo(
    () =>
      shortenNumber(amountToBeVested, 4) == "0"
        ? `${amountToBeVested} ${
            selectedToken?.content.metadata.symbol ?? "UNK"
          }`
        : shortenNumber(amountToBeVested, 4),
    [amountToBeVested, selectedToken?.content.metadata.symbol]
  );

  const numPayments = useMemo(
    () =>
      !!totalVestingDuration && !!payoutInterval
        ? Math.round(totalVestingDuration / payoutInterval)
        : 1,
    [totalVestingDuration, payoutInterval]
  );

  const amountPerPayout = useMemo(
    () => ({
      amount: Math.round(amountToBeVested / numPayments),
      display:
        !!numPayments && !!amountToBeVested
          ? `${(amountToBeVested / numPayments).toFixed(4)} ${
              selectedToken?.content.metadata.symbol ?? "UNK"
            }`
          : "",
    }),
    [amountToBeVested, numPayments, selectedToken?.content.metadata.symbol]
  );

  const mint = useMemo(
    () => (selectedToken?.id ? new PublicKey(selectedToken.id) : null),
    [selectedToken]
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col">
        <div className="font-bold">Token</div>
        <div className="flex items-center gap-2">
          {selectedToken ? (
            <>
              <div className="avatar">
                <Link
                  href={getExplorerUrl(
                    connection.rpcEndpoint,
                    selectedToken?.id
                  )}
                  className="rounded-full w-12 h-12 link"
                >
                  {/* @ts-expect-error image does exist */}
                  {selectedToken?.content.links?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="rounded-full"
                      // @ts-expect-error image does exist
                      src={selectedToken?.content.links?.image}
                      alt={""}
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="rounded-full" src={"/LP.png"} alt={""} />
                  )}
                </Link>
              </div>
              <div className="text-xl font-bold flex flex-col">
                {selectedToken?.content.metadata.symbol}
                <TokenMintDisplay connection={connection} mint={mint} />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <IconCoin /> Select a token
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-bold">Amount</div>
        <div className="font-bold">{displayAmount}</div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold">Payouts</span>
          {autopay && (
            <div className="flex text-xs">
              Autopay <IconCircleCheck className="text-success w-4 h-4" />
            </div>
          )}
        </div>
        <div className="font-bold">
          {numPayments} x {amountPerPayout.display}
        </div>
      </div>

      {recipient && (
        <div className="flex flex-col gap-2">
          <div className="font-bold">Recipient</div>
          <div className="font-bold">
            <RecipientDisplay
              connection={connection}
              recipient={new PublicKey(recipient)}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="font-bold">Start Date</div>
        <div className="font-bold">
          <StartDateDisplay startDate={startDate} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-bold">Payout Date</div>
        <div className="font-bold">
          <EndDateDisplay vestingEndDate={vestingEndDate} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-bold">Payout Interval</div>
        <div className="font-bold">
          <PayoutIntervalDisplay payoutInterval={payoutInterval} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-bold">Cancel Authority</div>
        <div className="font-bold">
          <CancelAuthorityDisplay
            connection={connection}
            authority={authority}
            creator={creator}
            recipient={recipient}
          />
        </div>
      </div>
    </div>
  );
}
