import { cn } from '@/utils';
import Header from '@/components/layouts/landing/header';
import { Button } from '@/components/ui/button';
import founders from '@/data/founders';
import Founder from '@/components/common/founder';
import Footer from '@/components/layouts/landing/footer';
import Image from 'next/image';
import images from '@/assets/images';
import features from '@/data/features';
import Feature from '@/components/common/feature';

const Landing = function () {
    return (
        <main className={cn('relative bg-[#0d0e12]')}>
            {/* background-begin */}
            <section className={cn('absolute inset-0 -z-10 h-full w-full')}>
                <Image src={images.logo} alt="Background" className={cn('h-full w-full')} />
            </section>
            {/* background-end */}

            {/* banner-begin */}
            <section className={cn('px-0 pt-[215px]')}>
                <Header />
                <aside className={cn('mx-auto my-0 w-full max-w-[1200px]')}>
                    {/* slogan-begin */}
                    <section className={cn('text-center')}>
                        <h2 className={cn('text-[54px] leading-[64px] text-[#ff9345]')}>
                            Intelligent and Secure Messaging
                        </h2>
                        <h3 className={cn('mt-[15px] text-[42px] leading-[50px] text-[#fff]')}>
                            Keeping You Informed and Connected.
                        </h3>
                        <h4
                            className={cn(
                                'text-[rgb(119, 119, 118)] mx-auto mb-0 mt-10 max-w-[940px] text-[16px] leading-[20px]',
                            )}
                        >
                            Dmail Network is an AI-powered decentralized communication
                            infrastructure built to provide encrypted emails, unified notifications,
                            and targeted marketing across multiple chains and dApps for users,
                            developers, and marketers.
                        </h4>
                    </section>
                    {/* slogan-end */}

                    {/* links-begin */}
                    <section className={cn('mt-[60px] flex justify-center gap-10')}>
                        <Button>Launch Token</Button>
                        <Button>Subcription</Button>
                    </section>
                    {/* links-end */}

                    {/* statistic-begin */}
                    <section
                        className={cn(
                            'mt-[125px] flex h-[160px] items-center justify-around rounded-xl bg-[#13161B] px-[10px] py-0 text-center shadow-2xl',
                        )}
                    >
                        <div className="min-w-[160px]">
                            <p
                                className={cn(
                                    'mb-[10px] text-[42px] font-normal leading-[50px] text-[#fff]',
                                )}
                            >
                                152.77M
                            </p>
                            <span className={cn('block text-[16px] leading-[20px]')}>
                                Total Dmailers
                            </span>
                        </div>
                        <div className="min-w-[160px]">
                            <p
                                className={cn(
                                    'mb-[10px] text-[42px] font-normal leading-[50px] text-[#fff]',
                                )}
                            >
                                152.77M
                            </p>
                            <span className={cn('block text-[16px] leading-[20px]')}>
                                Total Dmailers
                            </span>
                        </div>
                        <div className="min-w-[160px]">
                            <p
                                className={cn(
                                    'mb-[10px] text-[42px] font-normal leading-[50px] text-[#fff]',
                                )}
                            >
                                152.77M
                            </p>
                            <span className={cn('block text-[16px] leading-[20px]')}>
                                Total Dmailers
                            </span>
                        </div>
                        <div className="min-w-[160px]">
                            <p
                                className={cn(
                                    'mb-[10px] text-[42px] font-normal leading-[50px] text-[#fff]',
                                )}
                            >
                                152.77M
                            </p>
                            <span className={cn('block text-[16px] leading-[20px]')}>
                                Total Dmailers
                            </span>
                        </div>
                    </section>
                    {/* statistic-end */}
                </aside>
            </section>
            {/* banner-end */}

            {/* feature-begin */}
            <section className={cn('px-0 py-[100px]')}>
                <aside className={cn('mx-auto my-0 flex w-full max-w-[1200px] flex-col gap-2')}>
                    {/* title-begin */}
                    <section
                        className={cn(
                            'relative mx-auto mb-[30px] flex flex-col items-center justify-center',
                        )}
                    >
                        <div
                            className={cn(
                                'relative mt-[15px] text-[42px] leading-[50px] text-[#fff]',
                            )}
                        >
                            <h3 className={cn('mb-3 font-bold text-white')}>Features</h3>
                            <svg
                                className={cn('absolute bottom-[-8px] right-[-24px] w-14')}
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 800 400"
                            >
                                <path
                                    d="M302.86320663978927 212.14618524196896C308.3938488313583 210.2029835411226 325.8826336213973 198.84272861762003 336.04705978920333 200.48697503689084C346.21148595700936 202.13122145616165 355.4790589957463 223.65590509060178 363.8497636466252 222.01166375759396C372.2204682975041 220.36742242458615 379.0964016267684 191.81734307888303 386.27128769447677 190.62152703884396C393.44617376218514 189.4257109988049 397.48203954587655 217.22839959743771 406.8990800528752 214.8367675173596C416.31612055987387 212.44513543728146 435.29968684405355 179.5602273969169 442.77353073646896 176.27173455837521C450.2473746288843 172.9832417198336 447.55679235349373 188.97726027452103 451.7421434073674 195.1058104861096C455.9274944612411 201.23436069769815 461.30865646889083 214.53780206325803 467.88563705971114 213.04303582790646C474.46261765053146 211.5482695925549 478.9469265291122 198.8427438764091 491.20402695228927 186.13721307400021C503.4611273754663 173.43168227159134 533.0575374910263 145.0310780235445 541.4282395987736 136.80985101345334 "
                                    fill="none"
                                    strokeWidth={16}
                                    stroke='url("#SvgjsLinearGradient1014")'
                                    strokeLinecap="round"
                                    transform="matrix(2.7720501897158254,0,0,2.7720501897158254,-758.9983293810534,-327.45974660271276)"
                                />
                                <defs>
                                    <linearGradient id="SvgjsLinearGradient1014">
                                        <stop stopColor="hsl(37, 99%, 67%)" offset={0} />
                                        <stop stopColor="hsl(316, 73%, 52%)" offset={1} />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <p className={cn('max-w-[600px] text-center font-normal')}>
                            Empowering Blockchain Innovation with Dynamic Metadata Upgrades and
                            Seamless Asset Management
                        </p>
                    </section>
                    {/* title-end */}

                    {/* content-begin */}
                    <section className={cn('grid grid-cols-3 gap-8')}>
                        {features.map(function (feature, index: number) {
                            return <Feature key={index} />;
                        })}
                    </section>
                    {/* content-end */}
                </aside>
            </section>
            {/* feature-end */}

            {/* about-begin */}
            <section className={cn('px-0 py-[100px]')}>
                <aside className={cn('mx-auto my-0 flex w-full max-w-[1200px] flex-col gap-2')}>
                    <div className={cn('flex w-full gap-7')}>
                        <div
                            className={cn(
                                'relative aspect-video w-[60%] rounded-3xl before:absolute before:left-8 before:top-8 before:h-full before:w-full before:rounded-3xl before:bg-slate-900 before:shadow-xl before:content-[""]',
                            )}
                        >
                            <iframe
                                className={cn(
                                    'absolute inset-0 z-10 block h-full w-full rounded-xl',
                                )}
                                src="https://www.youtube.com/embed/_GrbIRoT3mU"
                                title="Open source dynamic assets (Token/NFT) generator (CIP68)"
                                frameBorder={'none'}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            ></iframe>
                        </div>
                        <div className={cn('z-10 flex w-[40%] flex-col items-start gap-[15px]')}>
                            <h2 className={cn('text-left text-[25px] font-bold')}>
                                About CIP68 Generator
                            </h2>
                            <p className={cn('mb-1 text-[20px] font-normal')}>
                                Open source dynamic assets (Token/NFT) generator (CIP68)
                            </p>
                            <span className={cn('text-left leading-[1.8]')}>
                                We will develop a platform that enables users to choose dual targets
                                and trading methods directly within their wallets. Simultaneously,
                                we will create automated trading bots on decentralized exchanges
                            </span>
                            <span className={cn('text-left leading-[1.8]')}>
                                We will develop a platform that enables users to choose dual targets
                                and trading methods directly within their wallets. Simultaneously,
                                we will create automated trading bots on decentralized exchanges
                            </span>
                            <Button className={cn('w-full px-8 py-6')}>About us</Button>
                        </div>
                    </div>
                </aside>
            </section>
            {/* about-end */}

            {/* founder-begin */}
            <section className={cn('px-0 pt-[100px]')}>
                <aside className={cn('mx-auto my-0 flex w-full max-w-[1200px] flex-col gap-2')}>
                    {/* title-begin */}
                    <section
                        className={cn(
                            'relative mx-auto mb-[30px] flex flex-col items-center justify-center',
                        )}
                    >
                        <div
                            className={cn(
                                'relative mt-[15px] text-[42px] leading-[50px] text-[#fff]',
                            )}
                        >
                            <h3 className={cn('mb-3 font-bold text-white')}>Our Team</h3>
                            <svg
                                className={cn('absolute bottom-[-8px] right-[-24px] w-14')}
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 800 400"
                            >
                                <path
                                    d="M302.86320663978927 212.14618524196896C308.3938488313583 210.2029835411226 325.8826336213973 198.84272861762003 336.04705978920333 200.48697503689084C346.21148595700936 202.13122145616165 355.4790589957463 223.65590509060178 363.8497636466252 222.01166375759396C372.2204682975041 220.36742242458615 379.0964016267684 191.81734307888303 386.27128769447677 190.62152703884396C393.44617376218514 189.4257109988049 397.48203954587655 217.22839959743771 406.8990800528752 214.8367675173596C416.31612055987387 212.44513543728146 435.29968684405355 179.5602273969169 442.77353073646896 176.27173455837521C450.2473746288843 172.9832417198336 447.55679235349373 188.97726027452103 451.7421434073674 195.1058104861096C455.9274944612411 201.23436069769815 461.30865646889083 214.53780206325803 467.88563705971114 213.04303582790646C474.46261765053146 211.5482695925549 478.9469265291122 198.8427438764091 491.20402695228927 186.13721307400021C503.4611273754663 173.43168227159134 533.0575374910263 145.0310780235445 541.4282395987736 136.80985101345334 "
                                    fill="none"
                                    strokeWidth={16}
                                    stroke='url("#SvgjsLinearGradient1014")'
                                    strokeLinecap="round"
                                    transform="matrix(2.7720501897158254,0,0,2.7720501897158254,-758.9983293810534,-327.45974660271276)"
                                />
                                <defs>
                                    <linearGradient id="SvgjsLinearGradient1014">
                                        <stop stopColor="hsl(37, 99%, 67%)" offset={0} />
                                        <stop stopColor="hsl(316, 73%, 52%)" offset={1} />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <p className={cn('max-w-[600px] text-center font-normal')}>
                            We are impartial and independent, and every day we create distinctive,
                            world-class programmes and develop
                        </p>
                    </section>
                    {/* title-end */}

                    {/* founder-begin */}
                    <section
                        className={cn(
                            'grid grid-cols-3 content-start justify-stretch gap-8 rounded-lg',
                        )}
                    >
                        {founders.map(function (founder, index: number) {
                            return (
                                <Founder
                                    key={index}
                                    avatar={founder.avatar!}
                                    description={founder.description}
                                    firstName={founder.firstName}
                                    lastName={founder.lastName}
                                    id={index}
                                    linkedin={founder.linkedin}
                                    role={founder.role}
                                    twitter={founder.role}
                                    company={founder.company}
                                />
                            );
                        })}
                    </section>
                    {/* founder-end */}
                </aside>
            </section>
            {/* founder-end */}

            {/* bottom-begin */}
            <section className={cn('px-auto pb-[50px] pt-[100px]')}>
                <aside className={cn('mx-auto my-0 w-full max-w-[1200px]')}>
                    <Footer />
                </aside>
            </section>
            {/* bottom-end */}
        </main>
    );
};

export default Landing;
