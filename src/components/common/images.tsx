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
  collection: (props: LucideProps) => (
    <Image
      src={appImage.collection}
      className={props.className}
      alt="metadata"
    />
  ),
  storegae: (props: LucideProps) => (
    <Image src={appImage.storegae} className={props.className} alt="metadata" />
  ),
};
