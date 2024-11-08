import Header from "@/app/(landing)/_layout/header";
import { Button } from "@/components/ui/button";
import Footer from "@/app/(landing)/_layout/footer";
import Title from "./title";
import features from "../_data/features";
import Feature from "./feature-section";
import { founderData } from "../_data/founders";
import Founder from "./founder-section";

export default function LandingPage() {
  return (
    <main className="relative bg-[#0d0e12] px-4 overflow-x-hidden">
      <Header />
      {/* banner-begin */}
      <section className="px-0 pt-[215px] max-md:pt-[150px] max-md:px-3">
        <aside className="mx-auto my-0 w-full max-w-[1200px]">
          {/* slogan-begin */}
          <section className="text-center">
            <h2 className="text-[54px] leading-[64px] text-[#ff9345] max-md:text-[28px] max-md:leading-[33px] max-md:w-[320px] max-md:my-0 max-md:mx-auto">
              Intelligent and Secure Messaging
            </h2>
            <h3 className="mt-[15px] text-[42px] leading-[50px] text-[#fff] max-md:mt-[10px] max-md:text-[18px] max-md:leading-[22px]">
              Keeping You Informed and Connected.
            </h3>
            <h4 className="text-[rgb(119, 119, 118)] mx-auto mb-0 mt-10 max-w-[940px] text-[16px] leading-[20px] max-md:mt-5 max-md:mx-auto max-md:mb-0 max-md:text-[12px] max-md:leading-[16px]">
              Dmail Network is an AI-powered decentralized communication
              infrastructure built to provide encrypted emails, unified
              notifications, and targeted marketing across multiple chains and
              dApps for users, developers, and marketers.
            </h4>
          </section>
          {/* slogan-end */}

          {/* links-begin */}
          <section className="mt-[60px] max-md:mt-[30px] flex justify-center gap-10">
            <Button className="box-border flex cursor-pointer items-center rounded-[10px] px-6 py-0 text-[16px] font-medium leading-8 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg max-md:text-[14px] max-md:h-[35px] max-md:rounded-[5px] gap-2 ">
              Launch Token
              <svg
                width="12"
                height="9"
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.92652 0.198869L11.9459 4.51989C12.1925 4.78505 12.1925 5.21495 11.9459 5.48011L7.92652 9.80113C7.67987 10.0663 7.27998 10.0663 7.03334 9.80113C6.78669 9.53597 6.78669 9.10606 7.03334 8.8409L9.9745 5.67898H0.631579C0.282768 5.67898 0 5.37499 0 5C0 4.62501 0.282768 4.32102 0.631579 4.32102H9.9745L7.03334 1.1591C6.78669 0.893936 6.78669 0.464029 7.03334 0.198869C7.27998 -0.0662898 7.67987 -0.0662898 7.92652 0.198869Z"
                  fill="currentColor"
                ></path>
              </svg>
            </Button>
            <Button className="max-md:hidden box-border flex cursor-pointer items-center rounded-[10px] px-6 py-0 text-[16px] font-medium transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              Subcription
            </Button>
          </section>
          {/* links-end */}

          {/* statistic-begin */}
          <section className="mt-[125px] flex h-[160px] items-center justify-around rounded-xl bg-[#13161B] px-[10px] py-0 text-center shadow-2xl max-md:mt-[35px] max-md:bg-none max-md:flex-wrap max-md:h-0 max-md:p-0">
            <div className="min-w-[160px] max-md:flex max-md:flex-col-reverse max-md:justify-center max-md:items-center max-md:w-[50%] max-md:h-[88px] max-md:mb-[16px] max-md:bg-slate-900 max-md-relative">
              <p className="mb-[10px] text-[42px] font-normal leading-[50px] text-[#fff] max-md:text-[20px] max-md:leading-[24px] max-md:mt-[10px]">
                152.77M
              </p>
              <span className="block text-[16px] leading-[20px] max-md:mt-[3px] max-md:leading-1 max-md:text-[12px]">
                Total Dmailers
              </span>
            </div>

            <div className="min-w-[160px] max-md:flex max-md:flex-col-reverse max-md:justify-center max-md:items-center max-md:w-[50%] max-md:h-[88px] max-md:mb-[16px] max-md:bg-slate-900 max-md-relative">
              <p className="mb-[10px] text-[42px] font-normal leading-[50px] text-[#fff] max-md:text-[20px] max-md:leading-[24px] max-md:mt-[10px]">
                152.77M
              </p>
              <span className="block text-[16px] leading-[20px] max-md:mt-[3px] max-md:leading-1 max-md:text-[12px]">
                Total Dmailers
              </span>
            </div>

            <div className="min-w-[160px] max-md:flex max-md:flex-col-reverse max-md:justify-center max-md:items-center max-md:w-[50%] max-md:h-[88px] max-md:mb-[16px] max-md:bg-slate-900 max-md-relative">
              <p className="mb-[10px] text-[42px] font-normal leading-[50px] text-[#fff] max-md:text-[20px] max-md:leading-[24px] max-md:mt-[10px]">
                152.77M
              </p>
              <span className="block text-[16px] leading-[20px] max-md:mt-[3px] max-md:leading-1 max-md:text-[12px]">
                Total Dmailers
              </span>
            </div>

            <div className="min-w-[160px] max-md:flex max-md:flex-col-reverse max-md:justify-center max-md:items-center max-md:w-[50%] max-md:h-[88px] max-md:mb-[16px] max-md:bg-slate-900 max-md-relative">
              <p className="mb-[10px] text-[42px] font-normal leading-[50px] text-[#fff] max-md:text-[20px] max-md:leading-[24px] max-md:mt-[10px]">
                152.77M
              </p>
              <span className="block text-[16px] leading-[20px] max-md:mt-[3px] max-md:leading-1 max-md:text-[12px]">
                Total Dmailers
              </span>
            </div>
          </section>
          {/* statistic-end */}
        </aside>
      </section>
      {/* banner-end */}

      {/* feature-begin */}
      <section className={"px-0 mt-[200px]"}>
        <aside className="mx-auto my-0 flex w-full max-w-[1200px] flex-col gap-2">
          <Title />

          {/* content-begin */}
          <section className="grid grid-cols-3 gap-1 max-md:grid-cols-2 ">
            {features.map(function (feature, index: number) {
              return <Feature key={index} />;
            })}
          </section>
          {/* content-end */}
        </aside>
      </section>
      {/* feature-end */}

      {/* about-begin */}
      <section className="px-0 mt-[100px]">
        <aside className="mx-auto my-0 flex w-full max-w-[1200px] flex-col gap-2">
          <div className="flex w-full gap-7 max-sm:flex-col">
            <div className='m relative aspect-video w-[60%] rounded-3xl before:absolute before:left-8 before:top-8 before:h-full before:w-full before:rounded-3xl before:bg-slate-900 before:shadow-xl before:content-[""] max-sm:w-full'>
              <iframe
                className="absolute inset-0 z-10 block h-full w-full rounded-xl"
                src="https://www.youtube.com/embed/_GrbIRoT3mU"
                title="Open source dynamic assets (Token/NFT) generator (CIP68)"
                frameBorder={"none"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
            <div className="z-10 flex w-[40%] flex-col items-start gap-[15px] max-md:gap-3 max-sm:w-full">
              <h2 className="text-left text-[25px]  font-bold max-md:text-xl">
                About CIP68 Generator
              </h2>
              <p className="mb-1 text-[20px] font-normal max-md:text-lg">
                Open source dynamic assets (Token/NFT) generator (CIP68)
              </p>
              <span className={"text-left leading-[1.8] max-md:text-base"}>
                We will develop a platform that enables users to choose dual
                targets and trading methods directly within their wallets.
                Simultaneously, we will create automated trading bots on
                decentralized exchanges
              </span>
              <span className={"text-left leading-[1.8] max-md:text-base"}>
                We will develop a platform that enables users to choose dual
                targets and trading methods directly within their wallets.
                Simultaneously, we will create automated trading bots on
                decentralized exchanges
              </span>
              <Button className={"w-full px-8 py-6"}>About us</Button>
            </div>
          </div>
        </aside>
      </section>
      {/* about-end */}

      {/* founder-begin */}
      <section className={"px-0 mt-[100px] max-md:mt-[50px]"}>
        <aside className="mx-auto my-0 flex w-full max-w-[1200px] flex-col gap-2">
          <Title />
          {/* founder-begin */}
          <section className="grid grid-cols-3 content-start justify-stretch gap-8 rounded-lg max-lg:grid-cols-2 max-sm:grid-cols-1">
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
