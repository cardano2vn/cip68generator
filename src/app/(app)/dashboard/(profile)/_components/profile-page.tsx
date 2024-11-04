"use client";

import { Button } from "@/components/ui/button";
import { appImage, walletImage } from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import { IoLocation } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { VscVerified } from "react-icons/vsc";
import Asset from "./asset";

export default function ProfilePage() {
  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden">
      <aside className="py-8 px-10 m-auto flex flex-col gap-6 max-md:p-2">
        <section className="rounded-xl p-6 bg-[#13161b] shadow-md flex items-center justify-between flex-wrap gap-3">
          <div className="grid gap-6 items-center min-w-0">
            <section className="flex items-center gap-2">
              <div className="flex items-center justify-center w-[90px] h-[90px] shadow-sm overflow-hidden border-[1px] border-solid border-gray-800 rounded-full max-md:w-14 max-md:h-14">
                <Image
                  src={appImage.cardano}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 grid gap-1 justify-start ">
                <h3 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap justify-stretch text-2xl max-md:text-[24px] max-md:leading-7">
                  Independence
                </h3>
                <div className="flex items-center justify-center py-1 px-2 rounded-lg bg-[#282c34] text-gray-400 shadow-md gap-1">
                  <IoLocation className="text-[20px] max-md:text-[14px] font-bold text-gray-200" />
                  <span className="max-md:text-[12px]">
                    addr_test1qz...rtm6
                  </span>
                  <svg viewBox="0 0 24 24" width="12" height="12">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.643 6.5H8V6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-.5v-4.643A4.857 4.857 0 0 0 12.643 6.5ZM12 22H6a4 4 0 0 1-4-4v-6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
            </section>
            <section className="flex flex-wrap py-2 px-3 items-center gap-5 rounded-lg bg-[linear-gradient(270deg,_rgba(174,193,197,0)_0.07%,_rgba(174,193,197,0.19)_92.8%,_rgba(174,193,197,0.2)_99.14%)] max-md:py-1 max-md:px-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 max-md:w-5 max-md:h-5">
                  <Image
                    src={walletImage.nami}
                    alt="Wallet"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[10px]">Balance</p>
                  <p className="text-[14px] font-semibold">60,117.219 ₳</p>
                </div>
              </div>
            </section>
          </div>
          <div></div>
        </section>
        <section className="relative flex flex-none before:bg-[#282c34] before:absolute before:left-0 before:right-0 before:bottom-0 before:content-[''] before:h-[1px]">
          <div className="py-0 px-10 flex flex-none overflow-hidden whitespace-normal relative translate-x-0 transition-shadow duration-300">
            <div className="px-4 py-2 text-gray-200">Overview</div>
            <div className="px-4 py-2 text-gray-200">Metadata</div>
            <div className="px-4 py-2 text-gray-200">Storage</div>
            <div className="px-4 py-2 text-gray-200">Assets</div>
          </div>
        </section>
        <section className="flex flex-col">
          <div className="flex shrink-0 basis-auto flex-grow-0 relative">
            <section className="pt-2 flex-auto">
              <div className="flex w-full">
                <ul className="flex flex-col gap-8 w-full">
                  <li className="grid gap-5 p-6 bg-[#13161B] rounded-xl grid-rows-[auto_400px] w-full">
                    <header className="flex items-center justify-between gap-4">
                      <h5 className="text-[20px] text-gray-200 font-semibold leading-[24px]">
                        Ownership
                      </h5>
                      <Link
                        href={"/"}
                        className="flex items-center gap-2 h-7 py-0 px-3 bg-transparent  rounded-lg"
                      >
                        <span className="text-[14px] leading-6 text-wrap text-gray-300 ">
                          View All
                        </span>
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.707 12.707a1 1 0 0 0 0-1.414l-4-4a1 1 0 1 0-1.414 1.414L15.586 11H6a1 1 0 1 0 0 2h9.586l-2.293 2.293a1 1 0 0 0 1.414 1.414l4-4Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </Link>
                    </header>
                    <aside className="relative min-w-0 flex justify-center items-center h-full">
                      <section className="overflow-hidden h-full">
                        <Swiper
                          className="h-full"
                          slidesPerView={4}
                          spaceBetween={30}
                          // pagination={{
                          //   clickable: true,
                          // }}
                          // modules={[Pagination]}
                        >
                          <SwiperSlide>
                            <Asset />
                          </SwiperSlide>
                          <SwiperSlide>
                            <Asset />
                          </SwiperSlide>
                          <SwiperSlide>
                            <Asset />
                          </SwiperSlide>
                          <SwiperSlide>
                            <Asset />
                          </SwiperSlide>
                          <SwiperSlide>
                            <Asset />
                          </SwiperSlide>
                          <SwiperSlide>
                            <Asset />
                          </SwiperSlide>
                        </Swiper>
                      </section>
                      <section className="bg-[linear-gradient(270deg, #13161b 3.23%, rgba(13, 14, 18, 0) 76.21%)] justify-end pl-0 pr-[10px] right-[-30px] absolute flex items-center z-10 h-full top-0 ">
                        <Button className="bg-[#282C34] text-gray-200 rounded-xl text-[16px] leading-6 p-2">
                          <svg
                            className="w-6 h-6 object-cover"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M18.707 12.707a1 1 0 0 0 0-1.414l-4-4a1 1 0 1 0-1.414 1.414L15.586 11H6a1 1 0 1 0 0 2h9.586l-2.293 2.293a1 1 0 0 0 1.414 1.414l4-4Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </Button>
                      </section>
                    </aside>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </section>

        <section className="flex flex-col">
          <div className="flex shrink-0 basis-auto flex-grow-0 relative">
            <section className="pt-2 flex-auto">
              <div className="flex w-full">
                <ul className="flex flex-col gap-8 w-full">
                  <li className="grid gap-5 p-6 bg-[#13161B] rounded-xl grid-rows-[auto_400px] w-full">
                    <header className="flex items-center justify-between gap-4">
                      <h5 className="text-[20px] text-gray-200 font-semibold leading-[24px]">
                        Ownership
                      </h5>
                    </header>
                    <aside className="relative min-w-0 flex justify-center items-center h-full">
                      <section className="overflow-hidden h-full">
                        <Swiper
                          className="h-full"
                          slidesPerView={4}
                          spaceBetween={30}
                          // pagination={{
                          //   clickable: true,
                          // }}
                          // modules={[Pagination]}
                        >
                          <SwiperSlide>
                            <Asset />
                          </SwiperSlide>
                          <SwiperSlide>
                            <Asset />
                          </SwiperSlide>
                          <SwiperSlide>
                            <Asset />
                          </SwiperSlide>
                          <SwiperSlide>
                            <Asset />
                          </SwiperSlide>
                          <SwiperSlide>
                            <Asset />
                          </SwiperSlide>
                          <SwiperSlide>
                            <Asset />
                          </SwiperSlide>
                        </Swiper>
                      </section>
                      <section className="bg-[linear-gradient(270deg, #13161b 3.23%, rgba(13, 14, 18, 0) 76.21%)] justify-end pl-0 pr-[10px] right-[-30px] absolute flex items-center z-10 h-full top-0 ">
                        <Button className="bg-[#282C34] text-gray-200 rounded-xl text-[16px] leading-6 p-2">
                          <svg
                            className="w-6 h-6 object-cover"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M18.707 12.707a1 1 0 0 0 0-1.414l-4-4a1 1 0 1 0-1.414 1.414L15.586 11H6a1 1 0 1 0 0 2h9.586l-2.293 2.293a1 1 0 0 0 1.414 1.414l4-4Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </Button>
                      </section>
                    </aside>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </section>
      </aside>
    </main>
  );
}
