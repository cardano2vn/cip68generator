import { appImage } from "@/public/images";
import { LucideIcon, LucideProps } from "lucide-react";
import Image from "next/image";
export type Icon = LucideIcon;
export const Images = {
  logo: (props: LucideProps) => (
    <Image src={appImage.logo} className={props.className} alt="Logo" />
  ),
  metadata: (props: LucideProps) => (
    <Image src={appImage.metadata} className={props.className} alt="metadata" />
  ),
};
