import { cn } from "@/utils";
import Header from "@/app/(landing)/_layout/header";
import { Button } from "@/components/ui/button";
import Footer from "@/app/(landing)/_layout/footer";
import Image from "next/image";
import Title from "./title";
import { appImage } from "@/public/images";
import features from "../_data/features";
import Feature from "./feature-section";
import { founderData } from "../_data/founders";
import Founder from "./founder-section";

export default function LandingPage() {
  return (
    <main className={cn("relative bg-[#0d0e12] px-4")}>
      <Header />
      {/* background-begin */}
      <section className={cn("absolute inset-0 -z-10 h-full w-full")}>
        <Image
          src={appImage.logo}
          alt="Background"
          className={cn("h-full w-full")}
        />
      </section>
      {/* background-end */}

      {/* banner-begin */}
      <section className={cn("px-0 pt-[215px]")}>
        <aside className={cn("mx-auto my-0 w-full max-w-[1200px]")}>
          {/* slogan-begin */}
          <section className={cn("text-center")}>
            <h2 className={cn("text-[54px] leading-[64px] text-[#ff9345]")}>
              Intelligent and Secure Messaging
            </h2>
            <h3
              className={cn("mt-[15px] text-[42px] leading-[50px] text-[#fff]")}
            >
              Keeping You Informed and Connected.
            </h3>
            <h4
              className={cn(
                "text-[rgb(119, 119, 118)] mx-auto mb-0 mt-10 max-w-[940px] text-[16px] leading-[20px]",
              )}
            >
              Dmail Network is an AI-powered decentralized communication
              infrastructure built to provide encrypted emails, unified
              notifications, and targeted marketing across multiple chains and
              dApps for users, developers, and marketers.
            </h4>
          </section>
          {/* slogan-end */}

          {/* links-begin */}
          <section className={cn("mt-[60px] flex justify-center gap-10")}>
            <Button className="box-border flex cursor-pointer items-center rounded-[10px] px-6 py-0 text-[16px] font-medium leading-8 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              Launch Token
            </Button>
            <Button className="box-border flex cursor-pointer items-center rounded-[10px] px-6 py-0 text-[16px] font-medium transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              Subcription
            </Button>
          </section>
          {/* links-end */}

          {/* statistic-begin */}
          <section
            className={cn(
              "mt-[125px] flex h-[160px] items-center justify-around rounded-xl bg-[#13161B] px-[10px] py-0 text-center shadow-2xl",
            )}
          >
            <div className="min-w-[160px]">
              <p
                className={cn(
                  "mb-[10px] text-[42px] font-normal leading-[50px] text-[#fff]",
                )}
              >
                152.77M
              </p>
              <span className={cn("block text-[16px] leading-[20px]")}>
                Total Dmailers
              </span>
            </div>
            <div className="min-w-[160px]">
              <p
                className={cn(
                  "mb-[10px] text-[42px] font-normal leading-[50px] text-[#fff]",
                )}
              >
                152.77M
              </p>
              <span className={cn("block text-[16px] leading-[20px]")}>
                Total Dmailers
              </span>
            </div>
            <div className="min-w-[160px]">
              <p
                className={cn(
                  "mb-[10px] text-[42px] font-normal leading-[50px] text-[#fff]",
                )}
              >
                152.77M
              </p>
              <span className={cn("block text-[16px] leading-[20px]")}>
                Total Dmailers
              </span>
            </div>
            <div className="min-w-[160px]">
              <p
                className={cn(
                  "mb-[10px] text-[42px] font-normal leading-[50px] text-[#fff]",
                )}
              >
                152.77M
              </p>
              <span className={cn("block text-[16px] leading-[20px]")}>
                Total Dmailers
              </span>
            </div>
          </section>
          {/* statistic-end */}
        </aside>
      </section>
      {/* banner-end */}

      {/* feature-begin */}
      <section className={cn("px-0 py-[100px]")}>
        <aside
          className={cn(
            "mx-auto my-0 flex w-full max-w-[1200px] flex-col gap-2",
          )}
        >
          <Title />

          {/* content-begin */}
          <section
            className={cn(
              "grid grid-cols-3 gap-1 max-lg:grid-cols-2 max-sm:grid-cols-1",
            )}
          >
            {features.map(function (feature, index: number) {
              return <Feature key={index} />;
            })}
          </section>
          {/* content-end */}
        </aside>
      </section>
      {/* feature-end */}

      {/* about-begin */}
      <section className="px-0 py-[100px]">
        <aside className="mx-auto my-0 flex w-full max-w-[1200px] flex-col gap-2">
          <div className={"flex w-full gap-7 max-sm:flex-col"}>
            <div
              className={
                'm relative aspect-video w-[60%] rounded-3xl before:absolute before:left-8 before:top-8 before:h-full before:w-full before:rounded-3xl before:bg-slate-900 before:shadow-xl before:content-[""] max-sm:w-full'
              }
            >
              <iframe
                className={
                  "absolute inset-0 z-10 block h-full w-full rounded-xl"
                }
                src="https://www.youtube.com/embed/_GrbIRoT3mU"
                title="Open source dynamic assets (Token/NFT) generator (CIP68)"
                frameBorder={"none"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
            <div
              className={cn(
                "z-10 flex w-[40%] flex-col items-start gap-[15px] max-sm:w-full",
              )}
            >
              <h2 className={cn("text-left text-[25px] font-bold")}>
                About CIP68 Generator
              </h2>
              <p className={cn("mb-1 text-[20px] font-normal")}>
                Open source dynamic assets (Token/NFT) generator (CIP68)
              </p>
              <span className={cn("text-left leading-[1.8]")}>
                We will develop a platform that enables users to choose dual
                targets and trading methods directly within their wallets.
                Simultaneously, we will create automated trading bots on
                decentralized exchanges
              </span>
              <span className={cn("text-left leading-[1.8]")}>
                We will develop a platform that enables users to choose dual
                targets and trading methods directly within their wallets.
                Simultaneously, we will create automated trading bots on
                decentralized exchanges
              </span>
              <Button className={cn("w-full px-8 py-6")}>About us</Button>
            </div>
          </div>
        </aside>
      </section>
      {/* about-end */}

      {/* founder-begin */}
      <section className={cn("px-0 pt-[100px]")}>
        <aside
          className={cn(
            "mx-auto my-0 flex w-full max-w-[1200px] flex-col gap-2",
          )}
        >
          <Title />
          {/* founder-begin */}
          <section
            className={cn(
              "grid grid-cols-3 content-start justify-stretch gap-8 rounded-lg max-lg:grid-cols-2 max-sm:grid-cols-1",
            )}
          >
            {founderData.map(function (founder, index: number) {
              return (
                <Founder
                  key={index}
                  avatar={founder.avatar!}
                  description={founder.description}
                  firstName={founder.firstName}
                  lastName={founder.lastName}
                  id={index}
                  linkedin={founder.linkedin}
                  role={founder.role}
                  twitter={founder.role}
                  company={founder.company}
                />
              );
            })}
          </section>
          {/* founder-end */}
        </aside>
      </section>
      {/* founder-end */}

      {/* footer-begin */}
      <Footer />
      {/* footer-end */}
    </main>
  );
}
