import { LockAccount } from "program/accounts";
import { FC } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";

interface ScoreProps {
  lock: LockAccount;
  tooltipDirection?: string;
  lockSize?: string;
  lockTextSize?: string;
  lockTextPosition?: string;
}

const Score: FC<ScoreProps> = ({
  lock,
  tooltipDirection,
  lockSize = "4xl",
  lockTextSize = "xs",
  lockTextPosition = "top-1/2 right-2",
}) => {
  return (
    <div
      className={`relative tooltip ${tooltipDirection}`}
      data-tip={
        "Score is calculated based on the amount of LP locked, the duration of the lock, and rather or not the mint and freeze authority are renounced."
      }
    >
      {lock.canUnlock ? (
        <FaUnlock
          className={`text-${lockSize} ${
            Number(lock.score) <= 5
              ? "text-error"
              : Number(lock.score) <= 7.5
              ? "text-warning"
              : "text-success"
          }`}
        />
      ) : (
        <FaLock
          className={`text-${lockSize} ${
            Number(lock.score) <= 5
              ? "text-error"
              : Number(lock.score) <= 7.5
              ? "text-warning"
              : "text-success"
          }`}
        />
      )}

      <div
        className={`absolute text-center text-${lockTextSize} font-bold text-base-content ${lockTextPosition}`}
      >
        {Number(lock.score)}
      </div>
    </div>
  );
};

export default Score;
