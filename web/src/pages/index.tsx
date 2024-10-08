import * as anchor from "@coral-xyz/anchor";

import {
  IconCalendarDollar,
  IconChartCandle,
  IconCircleKey,
  IconLayersIntersect2,
  IconShieldCheck,
  IconUserDollar,
  IconUsersGroup,
} from "@tabler/icons-react";
import { ValhallaConfig, getValhallaConfig } from "@valhalla/lib";

import { ExplorerLink } from "../components/ExplorerLink";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import SocialBar from "../components/SocialBar";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import dashboard from "../assets/dashboard.png";
import { useEffect } from "react";
import useProgram from "../hooks/useProgram";
import { useValhallaStore } from "../stores/useValhallaStore";

export default function HomeFeature() {
  const { connected, connection } = useProgram();
  const { config, setConfig } = useValhallaStore();

  useEffect(() => {
    if (connected && !config) {
      getValhallaConfig(connection).then((accountInfo) => {
        const { config } = accountInfo;

        setConfig(
          new ValhallaConfig(
            config.admin,
            config.devTreasury,
            config.daoTreasury,
            config.governanceTokenMintKey,
            new anchor.BN(config.devFee),
            new anchor.BN(config.autopayMultiplier),
            new anchor.BN(config.tokenFeeBasisPoints),
            new anchor.BN(config.governanceTokenAmount)
          )
        );
      });
    }
  }, [connected, connection, setConfig, config]);

  return (
    <main>
      <NextSeo
        title="Incentivized Vesting"
        description="Token 2022 & SPL compatible token vesting on Solana. We incentivize token vesting by rewarding users with $ODIN when they disburse a vault. The $ODIN token serves as the governance token for Valhalla DAO. Get $ODIN - control Valhalla."
        canonical={`https://valhalla.so`}
      />

      {/* Hero Section */}
      <div className="h-screen hero-bg">
        <div className="text-center pt-8 bg-gradient-to-b from-primary/0 to-base-300/50 flex flex-col justify-center w-full h-full">
          <div className="mt-12">
            <h1 className="text-7xl md:text-9xl text-accent drop-shadow-[0px_2px_5px_rgba(0,0,0,0.9)]">
              Valhalla
            </h1>

            <p className="pt-2 text-3xl font-bold text-base-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.9)]">
              Incentivized Vesting
            </p>

            <p className="pb-2 text-3xl font-bold text-base-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.9)]">
              Token 2022 & SPL Compatible
            </p>
          </div>

          {/* Social bar */}
          <section className="flex flex-col gap-6 py-10">
            <div className="flex items-center justify-center gap-2">
              {connected ? (
                <div className="flex gap-2">
                  <Link
                    target="_blank"
                    href={"https://discord.gg/valhalla_so"}
                    className="btn btn-primary"
                  >
                    Book a Demo
                  </Link>

                  <Link className="btn btn-accent" href={`/dashboard`}>
                    Your Dashboard
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
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
            <SocialBar className="font-bold text-base-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.9)]" />
          </section>
        </div>
      </div>

      {/* What Tease Section */}
      <section className="my-40 px-8">
        <h2 className="text-center">What can you do with Valhalla?</h2>

        {/* Hidden on LG and up */}
        <div className="flex lg:hidden flex-wrap gap-8 items-center justify-center">
          <div className="stats stats-vertical my-10">
            <div className="stat">
              <div className="stat-title">Disburse valid Vaults</div>
              <div className="stat-value">Disbursers</div>
              <div className="stat-figure">
                <IconCircleKey className="text-primary" size={48} />
              </div>
              <div className="stat-desc">
                Disburse a vault - get{" "}
                <ExplorerLink
                  label="$ODIN"
                  address={config?.governanceTokenMintKey.toBase58() || ""}
                />
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Vesting Schedules</div>
              <div className="stat-value">Vesting</div>
              <div className="stat-figure">
                <IconCalendarDollar className="text-secondary" size={48} />
              </div>
              <div className="stat-desc">Build trust in your project</div>
            </div>

            <div className="stat">
              <div className="stat-title">Token 2022 & SPL</div>
              <div className="stat-value">Support</div>
              <div className="stat-figure">
                <IconLayersIntersect2 className="text-accent" size={48} />
              </div>
              <div className="stat-desc">Token 2022 & SPL Compatible</div>
            </div>
          </div>
        </div>

        {/* Seen on LG and up */}
        <div className="hidden lg:flex flex-wrap items-center justify-center my-20 max-w-screen-xl mx-auto">
          <Image
            placeholder="blur"
            className="mx-auto rounded-lg rounded-b-none"
            src={dashboard}
            width={1440 / 2}
            height={945 / 2}
            alt="Dashboard image"
          />

          <div className="stats -mt-3 w-full">
            <div className="stat">
              <div className="stat-title">Disburse valid Vaults</div>
              <div className="stat-value">Disbursers</div>
              <div className="stat-figure">
                <IconCircleKey className="text-primary" size={48} />
              </div>
              <div className="stat-desc">
                Disburse a vault - get{" "}
                <ExplorerLink
                  label="$ODIN"
                  address={config?.governanceTokenMintKey.toBase58() || ""}
                />
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Vesting Schedules</div>
              <div className="stat-value">Vesting</div>
              <div className="stat-figure">
                <IconCalendarDollar className="text-secondary" size={48} />
              </div>
              <div className="stat-desc">
                Vest and build trust in your project
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Token 2022 & SPL</div>
              <div className="stat-value">Standards</div>
              <div className="stat-figure">
                <IconLayersIntersect2 className="text-accent" size={48} />
              </div>
              <div className="stat-desc">Token 2022 & SPL Compatible</div>
            </div>
          </div>
        </div>

        {/* ODIN */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 my-40 px-8 md:px-20">
          <section className="grid grid-cols-1">
            <div className="flex flex-col gap-12">
              <div className="grid grid-cols-1 gap-8">
                <Image
                  className="mx-auto rounded"
                  src={"/odin.png"}
                  width={256}
                  height={256}
                  alt="ODIN"
                />

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2 my-4">
                    <h4 className="text-primary">Governance</h4>
                    <h3>$ODIN</h3>
                  </div>

                  <p className="prose">
                    Valhalla.so&apos;s vaults can be disbursed by anyone -
                    earning them $ODIN! The $ODIN token serves as the governance
                    token for Valhalla DAO.
                  </p>

                  <div className="flex items-center justify-between">
                    <ExplorerLink
                      className="link link-primary"
                      label="View $ODIN"
                      address={config?.governanceTokenMintKey.toBase58() || ""}
                    />
                    <Link
                      target="_blank"
                      href={"https://discord.gg/valhalla_so"}
                      className="btn btn-primary"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dashboards */}
          <section className="grid grid-cols-1 items-center gap-8">
            <Image
              placeholder="blur"
              className="mx-auto rounded"
              src={dashboard}
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
                Valhalla.so&apos;s dashboard allows for managing all of your
                Valhalla accounts, providing users with a clear, real-time
                overview of their various activities
              </p>

              <div className="flex items-center justify-center gap-2">
                {connected ? (
                  <div className="flex gap-2">
                    <Link
                      target="_blank"
                      href={"https://discord.gg/valhalla_so"}
                      className="btn btn-primary"
                    >
                      Book a Demo
                    </Link>

                    <Link className="btn btn-accent" href={`/dashboard`}>
                      Your Dashboard
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <p className="text-center font-bold">
                      Connect your wallet to get started
                    </p>

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
          </section>
        </div>
      </section>

      {/* Second CTA */}
      <section className="my-40 px-8 py-20 flex flex-col items-center gap-4 bg-base-300">
        <h3 className="text-center">
          Get started today! Your $ODIN is waiting...
        </h3>
        {connected ? (
          <div className="flex gap-2">
            <Link
              target="_blank"
              href={"https://discord.gg/valhalla_so"}
              className="btn btn-primary"
            >
              Book a Demo
            </Link>

            <Link className="btn btn-accent" href={`/dashboard`}>
              Your Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="prose text-center">
              Connect your wallet to get started
            </p>

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
      </section>

      {/* Why Vest */}
      <section className="flex my-40 px-8 md:px-20 flex flex-col gap-16">
        <h1 className="text-center">Why should you vest your tokens?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="card">
            <div className="card-body">
              <div className="card-title text-3xl">
                <IconChartCandle className="text-primary" size={50} /> Market
                Stability
              </div>
              <p className="prose">
                Vesting tokens are released gradually, preventing sudden market
                flooding and maintaining the token&apos;s value and stability.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="card-title text-3xl">
                <IconUsersGroup className="text-secondary" size={50} /> Team
                Incentivization
              </div>
              <p className="prose">
                Vesting schedules incentivize team members to remain committed
                and contribute to the project&apos;s long-term success.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="card-title text-3xl">
                <IconUserDollar className="text-accent" size={50} /> Investor
                Confidence
              </div>
              <p className="prose">
                Clear vesting timelines provide transparency in token
                distribution, building trust and confidence among investors.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="card-title text-3xl">
                <IconShieldCheck className="text-accent" size={50} /> Regulatory
                Compliance
              </div>
              <p className="prose">
                Vesting schedules can help projects comply with regulatory
                requirements by demonstrating controlled and planned token
                distribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Last CTA */}
      <section className="bg-gradient-to-b from-primary/0 to-base-300">
        <div className="card grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-none">
          <div className="card-media">
            <Image
              src={"/ship.png"}
              width={1800}
              height={929}
              alt={"Viking Ship"}
            />
          </div>
          <div className="card-body flex flex-col items-center gap-4">
            <h3 className="card-title text-center">
              Ready to create your first Valhalla vesting schedule?
            </h3>
            {connected ? (
              <div className="flex gap-2">
                <Link className="btn btn-accent" href={`/dashboard`}>
                  Your Dashboard
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
                <p className="prose text-center">
                  Connect your wallet to get started
                </p>

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
      </section>
    </main>
  );
}
