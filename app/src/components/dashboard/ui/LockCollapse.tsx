import { FaCaretDown, FaCaretUp } from "react-icons/fa";

import BaseModel from "models/models";
import LoadingSpinner from "../../ui/LoadingSpinner";
import LockDetails from "./LockDetails";
import useProgram from "program/useProgram";
import { useState } from "react";

export default function LockCollapse({
  lock,
  disburse,
  changeRecipient,
  cancel,
}: {
  lock: BaseModel;
  disburse: (lock: BaseModel) => Promise<void>;
  changeRecipient: (lock: BaseModel) => Promise<void>;
  cancel: (lock: BaseModel) => Promise<void>;
}) {
  const { connection } = useProgram();
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <li
        key={lock.id.toBase58()}
        className="border rounded p-2 items-center gap-1 my-1 md:justify-between cursor-pointer bg-base-100 hover:bg-base-200 transition-colors"
        onClick={async () => {
          if (!showDetails) {
            setLoading(true);
            await lock.populate(connection, lock);
            setLoading(false);
          }

          setShowDetails(!showDetails);
        }}
      >
        <div className="font-bold">{lock.nameDisplay}</div>

        <div className="flex flex-wrap gap-4">
          <div className="font-bold flex items-center gap-1 text-xs">
            Mint: {lock.tokenMintDisplay}
          </div>

          <div className="font-bold flex items-center gap-1 text-xs">
            Creator: {lock.creatorDisplay}
          </div>

          <div className="font-bold flex items-center gap-1 text-xs">
            Recipient: {lock.recipientDisplay}
          </div>

          <div className="font-bold flex items-center gap-1 text-xs">
            Next Payout: {lock.nextPayoutDisplay}
          </div>

          <button className="btn btn-xs btn-ghost">
            {showDetails ? <FaCaretUp /> : <FaCaretDown />}
          </button>
        </div>
      </li>
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {showDetails && (
            <LockDetails
              lock={lock}
              disburse={disburse}
              cancel={cancel}
              changeRecipient={changeRecipient}
            />
          )}
        </>
      )}
    </>
  );
}
