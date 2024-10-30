import { appImage, walletImage } from "@/public/images";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden">
      <aside className="py-8 px-10 m-auto flex flex-col gap-6">
        <section className="rounded-xl p-6 bg-[#13161b] shadow-md flex items-center justify-between flex-wrap gap-3">
          <div className="grid gap-6 items-center min-w-0">
            <section className="flex items-center gap-2">
              <div className="flex items-center justify-center w-[90px] h-[90px] shadow-sm overflow-hidden border-[1px] border-solid border-gray-800 rounded-full">
                <Image
                  src={appImage.cardano}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 grid gap-1 justify-start ">
                <h3 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap justify-stretch text-2xl">
                  Independence
                </h3>
                <div className="flex items-center justify-center py-1 px-2 rounded-lg bg-[#282c34] text-gray-400 shadow-md gap-1">
                  <Image
                    src={walletImage.nami}
                    alt="Wallet"
                    className="w-4 h-4 object-cover"
                  />
                  <span>addr_test1qz...rtm6</span>
                  <svg viewBox="0 0 24 24" width="12" height="12">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.643 6.5H8V6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-.5v-4.643A4.857 4.857 0 0 0 12.643 6.5ZM12 22H6a4 4 0 0 1-4-4v-6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
            </section>
            <section className="flex flex-wrap py-2 px-3 items-center gap-5 rounded-lg bg-[linear-gradient(270deg,_rgba(174,193,197,0)_0.07%,_rgba(174,193,197,0.19)_92.8%,_rgba(174,193,197,0.2)_99.14%)]">
              <div className="flex items-center gap-2">
                <Image
                  src={walletImage.nami}
                  alt="Wallet"
                  className="w-7 h-7 object-cover"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-[10px]">Balance</p>
                  <p className="text-[14px] font-semibold">60,117.219 ₳</p>
                </div>
              </div>
            </section>
          </div>
          <div></div>
        </section>
      </aside>
    </main>
  );
}
