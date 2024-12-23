import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
   <main className="flex flex-col h-screen overflow-hidden">
    <section className="m-4 flex py-1">
      <Image src={'/logo.webp'} className="" width={76.5} height={18.5} alt="Apple Watch"/>
    </section>
    <div className="w-full flex flex-col py-9 px-5">
      <>
      <p className="collectionname">Apple Watch Studio</p>
      <h1>Choose a case. <br/>
     Pick a band. <br />
      Create your own style.</h1>
      </>
     <Button className="mt-[42px]">Get  started</Button>
    </div>
    <div className="relative w-full h-[53vh] transform scale-[1.45] translate-y-[70px] md:flex md:items-center md:justify-center" aria-label="46mm Jet Black Aluminum Case with Black Solo Loop Front view" >
      <Image height={500} width={500} src={'/watchface/watch-1.png'} alt="Watch-1" className="absolute  z-10"/>
      <Image height={500} width={500} src={'/strap/watchstrap-1.jpeg'} alt="Watch-1" className="absolute "/>
    </div>
   </main> 
   
  );
}
