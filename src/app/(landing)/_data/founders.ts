import { founderImage } from "@/public/images";
import { StaticImageData } from "next/image";

export const founderData: {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  avatar: StaticImageData;
  twitter: string;
  linkedin: string;
  description: string;
  company?: string;
}[] = [
  {
    id: 1,
    firstName: "Tien",
    lastName: "Nguyen Anh",
    role: "Computer Science Experts",
    avatar: founderImage.tien,
    twitter: "https://t.me/tiennguyenanh",
    linkedin: "https://www.linkedin.com/in/tienna/",
    description:
      "Founder of the VILAI stake pool, former Experts at HPE; Blockchain Support Engineer",
  },
  {
    id: 2,
    firstName: "Hieu",
    lastName: "Nguyen Van",
    role: "MSc. Electronics and Telecommunication",
    avatar: founderImage.hieu,
    twitter: "https://t.me/nvhieu1978",
    linkedin: "https://www.linkedin.com/in/nguyen-van-hieu-b4410121b/",
    description:
      "Founder of HADA stake pool, member of Plutus Pioneer Program, Researcher at VAST.",
  },
  {
    id: 3,
    firstName: "Son",
    lastName: "Nguyen Hong",
    role: "Full-stack Developer/Blockchain Developer",
    avatar: founderImage.son,
    twitter: "https://t.me/tiennguyenanh",
    linkedin: "https://www.linkedin.com/in/tienna/",
    description:
      "More than 2 years of building and operating on the Cardano platform.",
  },
  {
    id: 4,
    firstName: "Khanh",
    lastName: "Nguyen Duy",
    role: "Full-stack Developer/Blockchain Developer",
    avatar: founderImage.khanh,
    twitter: "https://t.me/nvhieu1978",
    linkedin: "https://www.linkedin.com/in/nguyen-van-hieu-b4410121b/",
    description:
      "More than 2 years of building and operating on the Cardano platform.",
  },
  {
    id: 4,
    firstName: "Dung",
    lastName: "Phung Tien",
    role: "Full-stack Developer/Blockchain Developer",
    avatar: founderImage.dung,
    twitter: "https://t.me/tidvn",
    linkedin: "https://www.linkedin.com/",
    description:
      "More than 2 years of building and operating on the Cardano platform.",
  },
];
