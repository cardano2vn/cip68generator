import GuideStep from "../_components/faq-step";
import { cn } from "@/utils";

const buyGuides = [
  {
    id: 1,
    title: "Connect your Cardano wallet",
    description:
      "Before purchasing an NFT on DEMARKET, make sure your compatible Cardano wallet (Nami, Eternl, Vespr, Lace, or Flint) is connected to the platform. If you haven't connected your wallet yet, follow the steps in the earlier guide on connecting your wallet.",
  },
  {
    id: 2,
    title: "Browse the marketplace",
    description:
      "Once your wallet is connected, explore the DEMARKET marketplace to find the NFT you'd like to purchase. You can use the search bar and filters to narrow down your search based on categories, collections, price range, and other criteria.",
  },
  {
    id: 3,
    title: "Review NFT details",
    description:
      "When you find an NFT that interests you, click on its thumbnail to view more details. Review the NFT's name, description, creator, collection, and other relevant information.",
  },

  {
    id: 4,
    title: "Purchase on the NFT",
    description:
      "If the NFT is available for direct purchase, click the 'Buy' button and proceed to the next step. Ensure that you have enough ADA in your wallet to cover the transaction and any associated fees.",
  },
  {
    id: 5,
    title: "Confirm the transaction",
    description:
      "After clicking the 'Buy' button, you will be prompted to confirm the transaction in your Cardano wallet. Review the transaction details, including the NFT price and any associated fees. If everything looks correct, confirm the transaction. The NFT purchase or bid will be processed on the Cardano blockchain.",
  },
  {
    id: 6,
    title: "Receive your NFT",
    description:
      "Once the purchase or auction is complete, the NFT will be transferred to your Cardano wallet. You can view your newly acquired NFT in your profile under the 'My Assets' section on DEMARKET or within your wallet's native token and NFT section.",
  },
];

const sellGuides = [
  {
    id: 1,
    title: "Connect your Cardano wallet",
    description:
      "Before selling an NFT on DEMARKET, make sure your compatible Cardano wallet (Nami, Eternl, Vespr, Lace, or Flint) is connected to the platform. If you haven't connected your wallet yet, follow the steps in the earlier guide on connecting your wallet.",
  },
  {
    id: 2,
    title: "Browse the marketplace",
    description:
      "Once your wallet is connected, if you want to sell any NFT in your wallet, I have to access “Account” Page and click “My Assets”. Then, you can choose your favorite NFT which want to sell on DEMARKET. ",
  },
  {
    id: 3,
    title: "Review NFT details and Sell",
    description:
      "When you find an NFT that interests, you have to enter your price that buyer must pay for it. Finally, let’s click “sell” button and proceed to the next step. Ensure that you have enough ADA in your wallet to cover the transaction and any associated fees.",
  },
  {
    id: 4,
    title: "Confirm the transaction",
    description:
      "After clicking the 'Sell' button, you will be prompted to confirm the transaction in your Cardano wallet. Review the transaction details. If everything looks correct, confirm the transaction. The NFT selling will be processed on the Cardano blockchain.",
  },
  {
    id: 5,
    title: "Check your NFT",
    description:
      "Once the selling is complete, the NFT will be transferred to the DEMARKET. You can view your newly acquired NFT in your profile under the 'Selling' section on DEMARKET or within your wallet's native token and NFT section.",
  },
];

const guideConnectWallet = [
  {
    id: 1,
    title: "Choose a compatible Cardano wallet",
    description:
      "Before you can connect your wallet to DEMARKET, you'll need to have a compatible Cardano wallet. Popular Cardano wallets include Nami, Eternl, Vespr, Lace, and Flint. If you don't have a wallet yet, download and set up one of these wallets and ensure you have some ADA (Cardano's native cryptocurrency) in your wallet for transaction fees.",
  },
  {
    id: 2,
    title:
      "Navigate to DEMARKET and click 'Connect Wallet' on the top right corner of the page",
    description:
      "Visit the DEMARKET website at https://demarket-frontend.vercel.app/ . On the top right corner you will find the 'Connect Wallet' button. Click on it to initiate the wallet connection process.",
  },
  {
    id: 3,
    title: "Select your wallet provider",
    description:
      "A pop-up window will appear, asking you to choose your Cardano wallet provider from the available options. Select the wallet you have set up in Step 1 (Nami, Eternl, Vespr, Lace, or Flint).",
  },
  {
    id: 4,
    title: "Wallet connection approval",
    description:
      "Have a piece of digital art, music, or video that you'd like to turn into an NFT? Visit the 'Mint' section and follow the instructions to create and list your NFT on DEMARKET.",
    description2:
      "After selecting your wallet provider, you will be prompted to approve the connection between your wallet and DEMARKET. This process may vary slightly depending on the wallet you are using:",
    bonus: [
      {
        content:
          "Eternl: Open the Eternl wallet on your device, navigate to the 'DApp Connector' tab, and select DEMARKET from the list of available DApps. Click 'Connect' to approve the connection.",
      },
      {
        content:
          "Lace: A new window will open, asking you to approve the connection. Review the requested permissions and click 'Allow' to connect your Yoroi wallet to DEMARKET.",
      },
      {
        content:
          "Nami: The Nami browser extension will prompt you to approve the connection. Click 'Access' to connect your Nami wallet to DEMARKET.",
      },
    ],
  },

  {
    id: 5,
    title: "Verify the connection",
    description:
      "Once you have approved the connection, your wallet address should be displayed on the top right corner of the DEMARKET homepage, replacing the 'Connect Wallet' button. This indicates that your wallet is successfully connected to the platform.",
    description2:
      "Now that your wallet is connected, you can mint, buy, sell, and trade NFTs on DEMARKET. Remember to always securely store your wallet's private keys or seed phrases, as they are crucial for accessing your funds and assets.",
  },
];

const guideGetStarteds = [
  {
    id: 1,
    title: "Introduction to Cardano on DEMARKET",
    description:
      "DEMARKET is not only a project of BLOCKALPHA, but also part of a larger mission - to contribute to the decentralization of exchanges around the world.",
    description2:
      "DEMARKET is a decentralized NFT exchange project developed by the BLOCKALPHA team. The project has received high ratings from the review (CR) community with a score of 4.61, and ranked 2nd in the ranking in the Startup & Onboarding for Students category of Project Catalyst Fund 10. DEMARKET possesses many superior features, bringing great benefits to users, including:",
    bonus: [
      {
        content:
          " Popularizing Blockchain for common users: DEMARKET is designed with a friendly, easy-to-use interface, suitable for all audiences, including beginners.",
      },
      {
        content:
          " Contributing to promoting the transition of web2.0 to web3.0: DEMARKET uses Blockchain technology, helping users own their NFT assets safely and transparently.",
      },
      {
        content:
          "Stop illegal data collection and asset theft: DEMARKET operates on a decentralized platform, does not require users to provide personal information.",
      },
    ],
  },

  {
    id: 2,
    title: "What are NFTs?",
    description:
      "Non-fungible tokens (NFTs) are digital assets that represent ownership of unique items or content. Unlike cryptocurrencies like Bitcoin or Cardano, which are fungible and interchangeable, each NFT has distinct properties and cannot be exchanged on a one-to-one basis. NFTs can represent digital art, music, videos, virtual real estate, and more.",
  },

  {
    id: 3,
    title: "What is Cardano ecosystem?",
    description:
      "Cardano is a third-generation blockchain platform that offers a more eco-friendly and sustainable alternative to Ethereum, the current leading platform for NFTs. Cardano's proof-of-stake (PoS) consensus mechanism reduces energy consumption and transaction fees, making it an attractive choice for minting and trading NFTs.",
  },

  {
    id: 4,
    title: "Getting Started on DEMARKET",
    description:
      "To begin your journey with Cardano NFTs on DEMARKET, follow these simple steps: ",

    bonus: [
      {
        content:
          " Step 1: Connect your wallet: Connect a compatible Cardano wallet, like Nami, Eternl, Lace, Flint, or Vespr by clicking the 'Connect Wallet' button on the top right corner of the DEMARKET homepage.",
      },
      {
        content:
          " Step 2: Browse the marketplace: Discover unique NFTs created by talented artists and creators from around the world. You can filter your search based on categories, collections, and more.",
      },
      {
        content:
          " Step 3: Buy, sell, and trade NFTs: Interact with the vibrant DEMARKET community by buying, selling, and trading NFTs.",
      },

      {
        content:
          "Step 4: Mint your own NFT: Have a piece of digital art, music, or video that you'd like to turn into an NFT? Visit the 'Mint' section and follow the instructions to create and list your NFT on DEMARKET.",
      },
    ],
  },
  {
    id: 5,
    title: "The DEMARKET Advantage",
    description: "DEMARKET offers a range of benefits for users, including:",

    bonus: [
      {
        content:
          "Users participating as buyers can purchase assets on DEMARKET.",
      },
      {
        content: "Users participating as sellers can sell or withdraw assets.",
      },
      {
        content: "Users will receive royalties if the NFT is minted by them.",
      },
      {
        content:
          "Users can register intellectual products by minting NFTs on DEMARKET.",
      },
      {
        content: "Users can create intellectual product collections.",
      },
      {
        content: "Users can build an account to become a store page.",
      },
      {
        content:
          "The platform includes documentation on how to use it for beginners.",
      },
      {
        content: "Users can tracking the history of transaction NFT.",
      },
      {
        content: "Users can donate to the operating platform.",
      },
    ],
  },

  {
    id: 6,
    title: "Conclusion",
    description:
      "DEMARKET is developed based on Cardano, an ecosystem with a series of outstanding advantages compared to other Blockchain platforms, helping users to be assured of security, personal information will never be compromised. violations, costs incurred are less expensive,…",
  },
];

const createGuides = [
  {
    id: 1,
    title: "Step 1: Connect your Cardano wallet",
    description:
      "Before you can mint an NFT on DEMARKET, ensure that your compatible Cardano wallet (Nami, Eternl, Vespr, Lace, or Flint) is connected to the platform. If you haven't connected your wallet yet, follow the steps in the previous guide on connecting your wallet.",
    description2: "",
  },
  {
    id: 2,
    title: "Step 2: Navigate to the Minting section",
    description:
      "Once your wallet is connected, click on the 'MINT' button in the main navigation menu on the DEMARKET homepage. This will take you to the minting section of the platform.",
  },
  {
    id: 3,
    title: "Step 3: Upload your NFT file",
    description:
      "In the minting section, click the 'Upload' button to select the file you'd like to mint as an NFT. DEMARKET supports various file types, including JPEG, PNG, GIF, MP4, and MP3. Ensure that your file meets the format and size requirements listed on the platform.",
  },
  {
    id: 4,
    title: "Step 4: Enter NFT details",
    description:
      "After uploading your file, complete the required fields to provide more information about your NFT:",
    bonus: [
      {
        content: "Title : Give your NFT a unique and descriptive title.",
      },
      {
        content:
          "On-Chain Name : Enter a unique identifying name that is recorded on the block chain and used to identify your NFT.",
      },
      {
        content:
          "Description : Provide a detailed description of your NFT, including any relevant background information, inspiration, or context.",
      },
    ],
  },
  {
    id: 5,
    title: "Step 5: Review and mint",
    description:
      "Before minting your NFT, review all the provided information to ensure accuracy. If everything looks correct, click the 'Mint' button to initiate the minting process. You will be prompted to confirm the transaction in your Cardano wallet. There may be a small transaction fee involved, which will be deducted from your wallet's ADA balance. Once you confirm the transaction, the minting process will begin, and your NFT will be created on the Cardano blockchain.",
  },
  {
    id: 6,
    title: "Step 6: View and manage your NFT",
    description:
      "After the minting process is complete, you can view your newly minted NFT in your profile under the 'My Assets' section. From there, you can manage your NFT, including listing it for sale or transferring it to another wallet.",
  },
];

const smartContractGuides = [
  {
    id: 1,
    title: "Action sell: ",
    description: "",
    bonus: [
      {
        content:
          "My Assets: Query all NFTs in your wallet, so you can choose anyone to sell them.",
      },
      {
        content:
          "Sell NFTs: You can lock your assets in our platform, and then your assets will be put on our DEMARKET. ",
      },
      {
        content: "When selling your assets, you have to sign your transaction.",
      },
      {
        content:
          "Buy NFTs: Connect your wallet and buy your assets. You have to sign your transaction.",
      },
      {
        content:
          "Smart contracts will refund NFTs for users. And the seller receives your ADA. ",
      },
    ],
  },
  {
    id: 2,
    title: "Action royalty playment: ",
    bonus: [
      {
        content:
          "If you don't want to sell your NFT, you can delete it on our platform. Therefore, your assets will refund to your wallet (including tsx fees, … )",
      },
      {
        content:
          "When having a transaction of NFTs, the author of NFTs will receive a little money.",
      },
    ],
  },
];

const faqs: { title: string; Children: () => JSX.Element }[] = [
  {
    title: "How to get started in DEMARKET?",
    Children: function () {
      return (
        <aside className={""}>
          <section className="guide__video">
            <iframe
              className={cn(
                "mt-4 block aspect-video w-full rounded-lg object-contain",
              )}
              src="https://www.youtube.com/embed/bA_0YiNfma8?si=ZI3jimRKeZO133_2"
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </section>
          <h2 className={cn("mt-6 text-white")}>
            DEMARKET is developed based on Cardano, an ecosystem with a series
            of outstanding advantages compared to other Blockchain platforms,
            helping users to be assured of security, personal information will
            never be compromised. violations, costs incurred are less
            expensive,…
          </h2>
          <div>
            {guideGetStarteds.map(function (
              { id, description, title, description2, bonus },
              index,
            ) {
              return (
                <GuideStep
                  id={id}
                  key={index}
                  title={title}
                  description={description}
                  description2={description2}
                  bonus={bonus}
                />
              );
            })}
          </div>
        </aside>
      );
    },
  },
  {
    title: "How to connect your wallet to the Demarket platform?",
    Children: function () {
      return (
        <aside className={cn("guide__content")}>
          <section className="guide__video">
            <iframe
              className={cn(
                "mt-4 block aspect-video w-full rounded-lg object-contain",
              )}
              src="https://www.youtube.com/embed/KJ8BicG_heU?si=Otckt-u675iFiIqV"
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </section>
          <h2 className={cn("mt-6 text-white")}>
            To buy, mint or manage NFTs on DEMARKET, you&apos;ll first need to
            connect your wallet. You can do so in just a few easy steps!
          </h2>
          <div>
            {guideConnectWallet.map(function (
              { id, description, title, description2, bonus },
              index,
            ) {
              return (
                <GuideStep
                  key={index}
                  id={id}
                  title={title}
                  description={description}
                  description2={description2}
                  bonus={bonus}
                />
              );
            })}
          </div>
        </aside>
      );
    },
  },
  {
    title: "How can I create an NFT?",
    Children: function () {
      return (
        <aside className={cn("guide__content")}>
          <section className="guide__video">
            <iframe
              className={cn(
                "mt-4 block aspect-video w-full rounded-lg object-contain",
              )}
              src="https://www.youtube.com/embed/2pUNempKByo?si=5p6i-ujMnug3Kx89"
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </section>
          <h2 className={cn("mt-6 text-white")}>
            Minting an NFT on DEMARKET is a straightforward process. Follow
            these detailed steps to create and list your NFT on the platform:
          </h2>

          <div>
            {createGuides.map(function (
              { id, description, title, description2, bonus },
              index,
            ) {
              return (
                <GuideStep
                  key={index}
                  id={id}
                  title={title}
                  description={description}
                  description2={description2}
                  bonus={bonus}
                />
              );
            })}
          </div>
        </aside>
      );
    },
  },
  {
    title: "How does smart contract work on DEMARKET?",
    Children: function () {
      return (
        <aside className={cn("guide__content")}>
          <h2 className={cn("mt-6 text-white")}>
            Smart contracts are executed on blockchain, which means that the
            terms are stored in a distributed database and cannot be changed.
            Transactions are also processed on the blockchain, which automates
            payments and counterparties.
          </h2>

          <div>
            {/*  eslint-disable @typescript-eslint/no-explicit-any  */}

            {smartContractGuides.map(function (
              { id, title, description, bonus }: any,
              index,
            ) {
              return (
                <GuideStep
                  key={index}
                  id={id}
                  title={title}
                  description={description}
                  bonus={bonus}
                />
              );
            })}
          </div>
        </aside>
      );
    },
  },
  {
    title: "A complete guide to sell your NFTs?",
    Children: function () {
      return (
        <aside className={cn("guide__content")}>
          <section className="guide__video">
            <iframe
              className={cn(
                "mt-4 block aspect-video w-full rounded-lg object-contain",
              )}
              src="https://www.youtube.com/embed/jt56Ek5rY08?si=_b5WnD5_UTQxoX8l"
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </section>
          <h2 className={cn("mt-6 text-white")}>Selling an NFT on Demarket</h2>
          <div>
            {/*  eslint-disable @typescript-eslint/no-explicit-any  */}
            {sellGuides.map(function (
              { id, title, description, bonus }: any,
              index,
            ) {
              return (
                <GuideStep
                  key={index}
                  id={id}
                  title={title}
                  description={description}
                  bonus={bonus}
                />
              );
            })}
          </div>
        </aside>
      );
    },
  },
  {
    title: "A complete guide to buy your NFTs?",
    Children: function () {
      return (
        <aside className={cn("guide__content")}>
          <section className="guide__video">
            <iframe
              className={cn(
                "mt-4 block aspect-video w-full rounded-lg object-contain",
              )}
              src="https://www.youtube.com/embed/nRssNP9Vrts?si=p6XUxmb-YZqGPjmR"
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </section>
          <h2 className={cn("mt-6 text-white")}>Buying an NFT on Demarket</h2>
          <div>
            {buyGuides.map(function ({ id, title, description }, index) {
              return (
                <GuideStep
                  key={index}
                  id={id}
                  title={title}
                  description={description}
                />
              );
            })}
          </div>
        </aside>
      );
    },
  },
];

export default faqs;
