import Image, { StaticImageData } from 'next/image';

type Props = {
    title: string;
    className?: string;
    description: string;
    image: StaticImageData;
};

export default function Banner({ image, title, description }: Props) {
    return (
        <section className="relative h-[70vh] w-full">
            <Image
                className="after:z-2 absolute h-full w-full from-indigo-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:block after:h-[180%] after:bg-gradient-to-r after:content-['']"
                src={image}
                alt=""
            />
            <div className={'container'}>
                <h2 className={'title'}>{title}</h2>
                <p className={'description'}>{description}</p>
            </div>
        </section>
    );
}
