'use client';

import Banner from '@/components/common/banner';
import Title from '../landing/components/title';
import { bannerImage } from '@/public/images';
import faqs from './data/faq';
import FaqItem from './components/faq-item';
import Header from '@/components/layouts/landing/header';
import Footer from '@/components/layouts/landing/footer';
export default function FaqPage() {
    return (
        <main className="relative box-border flex flex-col items-center justify-center">
            <Header />
            <Banner
                title="Faqs Center"
                image={bannerImage.faq}
                description="Welcome to Demarket Guide - Cardano test platform on-chain NFT Marketplace. Lets build and connect with the community together in the world."
            />
            <Title />
            <section className="mx-auto my-0 flex w-full max-w-[1024px] flex-wrap justify-between py-2 text-left">
                {faqs.map(function (faq, index: number) {
                    return (
                        <FaqItem
                            index={index}
                            key={index}
                            Children={faq.Children}
                            title={faq.title}
                        />
                    );
                })}
            </section>
            <Footer />
        </main>
    );
}
