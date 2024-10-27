import { Images } from "@/components/common/images";
import { WalletConnectButton } from "@/components/common/wallet-connect-button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full bg-section">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex flex-1 items-center justify-start md:hidden">
          <Images.logo className="h-4 w-16" />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <WalletConnectButton />
        </div>
      </div>
    </header>
  );
}
