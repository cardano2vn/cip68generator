import logo from '@/public/image/logo.svg';
import metadata from '@/public/image/metadata.png';
import { LucideIcon, LucideProps } from 'lucide-react';
import Image from 'next/image';
export type Icon = LucideIcon;
export const Images = {
    logo: (props: LucideProps) => <Image src={logo} className={props.className} alt="Logo" />,
    metadata: (props: LucideProps) => (
        <Image src={metadata} className={props.className} alt="metadata" />
    ),
};
