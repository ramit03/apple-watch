import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
   <main className="flex flex-col h-screen overflow-hidden">
    <section className="m-4 flex py-1 md:py-0 md:m-[34px] md:mb-[45px]">
      <Image src={'/logo.webp'} className="md:w-[90px] md:h-[20px]" width={76.5} height={18.5} alt="Apple Watch"/>
    </section>
    <div className="w-full flex flex-col md:items-start py-9 md:py-[21px] px-5 md:px-6 lg:px-[152px]">
      <>
      <p className="collectionname w-full">Apple Watch Studio</p>
      <h1 className="w-full">Choose a case. <br/>
     Pick a band. <br />
      Create your own style.</h1>
      </>
     <Button className="mt-[42px] z-20">Get started</Button>
    </div>
    <div>
    <div className="relative w-full h-auto flex items-center transform scale-[1.4] translate-y-[36vh] md:translate-y-[43vh] lg:translate-y-[46vh] md:scale-[1.2]  justify-center" aria-label="46mm Jet Black Aluminum Case with Black Solo Loop Front view" >
      <Image height={500} width={500} src={'/watchface/watch-1.png'} alt="Watch-1" className="absolute z-10"/>
      <Image height={500} width={500} src={'/strap/watchstrap-1.jpeg'} alt="Watch-1" className="absolute"/>
    </div>
    </div>
   
   </main> 
   
  );
}
