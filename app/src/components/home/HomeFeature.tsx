import { FaCalendarAlt, FaCalendarCheck, FaLock } from "react-icons/fa";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import SocialBar from "components/ui/SocialBar";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useProgram from "program/useProgram";

export default function HomeFeature() {
  const { connected, wallet } = useProgram();

  return (
    <div>
      <Head>
        <title>Valhalla - Token Vesting Solutions</title>
        <meta
          name="description"
          content="Token Vesting and Locks on Solana. Lock your tokens until Valhalla."
        />
      </Head>

      {/* Hero Section */}
      <div className="py-20 max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 p-4 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h1>Valhalla</h1>

            <p className="text-xl font-bold">
              Token 2022 Compatible Vesting Solutions
            </p>
            <p className="prose">
              Token Locks - Vesting Schedules - Micro Payments
            </p>
            <div className="card-actions">
              {connected ? (
                <div className="flex gap-2">
                  <Link
                    className="btn btn-accent"
                    href={`/dashboard/${wallet.publicKey.toBase58()}`}
                  >
                    Launch App
                  </Link>

                  <Link
                    target="_blank"
                    href={"https://discord.gg/valhalla_so"}
                    className="btn btn-primary"
                  >
                    Book a Demo
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="prose">Connect your wallet to get started</p>

                  <div className="flex gap-2">
                    <Link
                      target="_blank"
                      href={"https://discord.gg/valhalla_so"}
                      className="btn btn-primary"
                    >
                      Book a Demo
                    </Link>

                    <WalletMultiButton />
                  </div>
                </div>
              )}
            </div>
          </div>

          <Image
            className="hidden md:block mx-auto my-4"
            width={400}
            height={400}
            src="/hero.png"
            alt="Valhalla Hero"
          />
        </div>
      </div>

      <div className="py-10">
        <SocialBar />
      </div>

      <section className="max-w-screen-lg mx-auto">
        <div className="py-10">
          <h2 className="text-center">What can you do with Valhalla?</h2>

          <div className="stats w-full my-10">
            <div className="stat">
              <div className="stat-title">
                Search for and Lock your LP tokens
              </div>
              <div className="stat-value"> Locks</div>
              <div className="stat-figure">
                <FaLock className="text-primary" size={48} />
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">
                Pay teams in scheduled allotments
              </div>
              <div className="stat-value">Vesting</div>
              <div className="stat-figure">
                <FaCalendarCheck className="text-info" size={48} />
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Micro Payments</div>
              <div className="stat-value">Payments</div>
              <div className="stat-figure">
                <FaCalendarAlt className="text-accent" size={48} />
              </div>
            </div>
          </div>

          <Image
            className="mx-auto rounded-lg rounded-b-none"
            src="/dashboard-image.png"
            width={1440 / 2}
            height={945 / 2}
            alt="Dashboard image"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <h3 className="text-center">Get started today</h3>
          {connected ? (
            <div className="flex gap-2">
              <Link
                className="btn btn-accent"
                href={`/dashboard/${wallet.publicKey.toBase58()}`}
              >
                Launch App
              </Link>

              <Link
                target="_blank"
                href={"https://discord.gg/valhalla_so"}
                className="btn btn-primary"
              >
                Book a Demo
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="prose">Connect your wallet to get started</p>

              <div className="flex gap-2">
                <Link
                  target="_blank"
                  href={"https://discord.gg/valhalla_so"}
                  className="btn btn-primary"
                >
                  Book a Demo
                </Link>

                <WalletMultiButton />
              </div>
            </div>
          )}
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto item-center">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 my-4">
                <h4 className="text-primary">Vesting</h4>
                <h3>Token Vesting Schedules</h3>
              </div>

              <p className="prose">
                Valhalla&apos;s Vesting Schedules offer a strategic approach to
                token distribution that benefits both the project developers and
                the token holders. By gradually releasing tokens over a set
                period, vesting schedules help to prevent market flooding,
                maintaining the token&apos;s value and stability. This method is
                particularly useful for project teams and early investors, as it
                aligns their interests with the long-term success of the
                project.
              </p>

              <p className="prose">
                Vesting schedules can also act as an effective tool for employee
                retention, as team members are incentivized to stay and
                contribute to the project&apos;s progress. For investors, these
                schedules provide a clear roadmap of token allocation, enhancing
                transparency and trust in the project.
              </p>
            </div>

            <Image
              className="self-center"
              src="/vesting.png"
              width={1205 / 2}
              height={798 / 2}
              alt="Vesting Schedules"
            />
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
            <Image
              className="self-center"
              src="/locks.png"
              width={1205 / 2}
              height={798 / 2}
              alt="Token Locks"
            />

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 my-4">
                <h4 className="text-primary">Trust and Transparency</h4>
                <h3>Token Locks</h3>
              </div>

              <p className="prose">
                Token locks are a crucial feature, serving as a fundamental tool
                for enhancing trust and stability in various projects. On
                Valhalla.so, token locks can be employed to secure a portion of
                the total token supply, preventing their immediate circulation
                in the market. This mechanism is particularly beneficial for
                project developers and investors, as it helps in controlling
                inflation of the token and stabilizes its price by limiting
                oversupply.
              </p>

              <p className="prose">
                For initial coin offerings (ICOs) and presales, token locks
                ensure that developers and early investors are committed to the
                long-term success of the project, as their tokens are locked for
                a predetermined period. This builds investor confidence, as it
                demonstrates a commitment to gradual and sustainable growth
                rather than quick profits.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 my-4">
                <h4 className="text-primary">Set and Forget</h4>
                <h3>Scheduled Payments</h3>
              </div>

              <p className="prose">
                Scheduled Payments on Valhalla.so represent a seamless and
                reliable solution for executing single, specific future
                transactions. This feature is exceptionally beneficial for those
                who require precise timing in their payments, catering to unique
                scenarios like fulfilling contract obligations, making one-off
                investments, or handling special purchases. By integrating this
                functionality, Valhalla.so provides a crucial tool for precise
                financial planning and management.
              </p>

              <p className="prose">
                Offering unparalleled convenience, allowing users to set up
                their payment in advance and rest assured, knowing that their
                critical financial commitments will be met accurately and
                punctually. This feature is a testament to Valhalla.so&apos;s
                commitment to providing comprehensive, user-friendly crypto
                management solutions.
              </p>
            </div>

            <Image
              className="self-center"
              src="/payments.png"
              width={1205 / 2}
              height={798 / 2}
              alt="Token Locks"
            />
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Image
              className="self-center rounded"
              src="/dashboard-image.png"
              width={1440 / 2}
              height={945 / 2}
              alt="Dashboard image"
            />

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 my-4">
                <h4 className="text-primary">See all of your accounts</h4>
                <h3>Valhalla Dashboard</h3>
              </div>

              <p className="prose">
                Valhalla.so&apos;s dashboard stands as a centralized,
                user-friendly interface for managing all Valhalla accounts,
                crucial for anyone navigating the Solana blockchain&apos;s
                ecosystem. This comprehensive dashboard provides users with a
                clear, real-time overview of their various activities, including
                vesting schedules, token locks, and scheduled payments.
              </p>

              <p className="prose">
                Its intuitive design allows for easy monitoring and management
                of crypto assets, making it an essential tool for both novice
                and experienced users. The dashboard&apos;s ability to aggregate
                all account-related information in one place simplifies the
                tracking of asset performance, upcoming payments, and vesting
                milestones. It also enhances the user experience by offering
                straightforward navigation and interaction with various features
                of the platform.
              </p>

              <p className="prose">
                For those seeking to maintain a tight grip on their crypto
                dealings, the Valhalla.so dashboard is an indispensable asset,
                offering a blend of convenience, efficiency, and transparency,
                all within the robust and fast Solana blockchain environment.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 my-20">
          <h3 className="text-center">Create your Valhalla account</h3>
          {connected ? (
            <div className="flex gap-2">
              <Link
                className="btn btn-accent"
                href={`/dashboard/${wallet.publicKey.toBase58()}`}
              >
                Launch App
              </Link>

              <Link
                target="_blank"
                href={"https://discord.gg/valhalla_so"}
                className="btn btn-primary"
              >
                Book a Demo
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="prose">Connect your wallet to get started</p>

              <div className="flex gap-2">
                <Link
                  target="_blank"
                  href={"https://discord.gg/valhalla_so"}
                  className="btn btn-primary"
                >
                  Book a Demo
                </Link>

                <WalletMultiButton />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
