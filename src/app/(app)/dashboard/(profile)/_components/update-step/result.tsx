import Link from "next/link";
import { appNetwork } from "@/constants";
import { useUnitContext } from "@/contexts/unit";
export default function ResultStep() {
  const { txhash } = useUnitContext();

  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="flex flex-col items-center justify-center text-white">
        <p className="mb-2 text-center text-lg font-semibold">
          Mint successful! 🎉
        </p>
        <p className="mb-4 max-w-md text-center text-sm text-gray-300">
          Check your Nft in your Wallet. If it’s not visible, please wait a
          moment for the transaction to complete.
        </p>
        <Link
          href={`https://${appNetwork}.cexplorer.io/tx/${txhash}`}
          className="mt-4 rounded-lg bg-white px-6 py-2 text-sm font-semibold text-blue-500 shadow-md hover:bg-gray-100"
        >
          View on Cexplorer
        </Link>
      </div>
    </div>
  );
}
