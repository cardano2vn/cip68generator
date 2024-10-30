export default function Title() {
  return (
    <section className=" relative mx-auto mb-[30px] flex flex-col items-center justify-center">
      <div className="relative mt-[15px] text-[42px] leading-[50px] text-[#fff]">
        <h3 className="mb-3 font-bold text-center text-white max-md:text-[28px] max-md:leading-[33px] max-md:w-[320px] max-md:my-0 max-md:mx-auto">
          Features
        </h3>
        <svg
          className="absolute bottom-[-8px] right-[-24px] w-14"
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
      <p className="max-w-[600px] text-center font-normal max-md:text-[14px] max-md:leading-[18px] max-md:w-[320px] max-md:my-0 max-md:mx-auto">
        Empowering Blockchain Innovation with Dynamic Metadata Upgrades and
        Seamless Asset Management
      </p>
    </section>
  );
}
