"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);
  const handleClick = () => {
    setIsAnimating(true);
  };

  return (
    <main className="flex flex-col h-screen overflow-hidden">
      <section
        className={cn(
          "m-4 flex gap-4 flex-col lg:flex-row lg:justify-between justify-start py-1 md:py-0 md:m-[34px] md:mb-[45px]",
          isAnimating ? "items-center md:items-start" : "items-start"
        )}
      >
        <Image
          src={"/logo.webp"}
          className="md:w-[90px] md:h-[20px] "
          width={76.5}
          height={18.5}
          alt="Apple Watch"
        />
        {isAnimating &&  (
          <>
          <Select>
            <div className="hidden lg:flex">
            <SelectTrigger>
                <SelectValue
                  placeholder="Collections"
                  className="placeholder:buttonText placeholder:text-text buttonText text-text"
                >
                  Collections
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="mb-1" value="watch">
                  Apple Watch Series 10
                </SelectItem>
                <SelectItem className="border-y" value="hermès">
                  Apple Watch Hermès Series 10
                </SelectItem>
                <SelectItem value="se">Apple Watch SE</SelectItem>
              </SelectContent>
            </div>
             
            </Select>
            <motion.div
            initial={{
              opacity:0,
               visibility: "hidden"
            }}
            animate={{ 
              opacity: 1,
              visibility: "visible"
            }}
            transition={{
              delay: 1.2,
              duration: 0.5,
              ease: "easeOut",
            }}
            >
            <Button className="hidden lg:flex" size={"sm"}>Save</Button>
            </motion.div>
            </>
        )}
         
        {isAnimating && (
          <div className="w-full lg:hidden flex flex-row items-center justify-between">
            <Select>
              <SelectTrigger>
                <SelectValue
                  placeholder="Collections"
                  className="placeholder:buttonText placeholder:text-text buttonText text-text"
                >
                  Collections
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="mb-1" value="watch">
                  Apple Watch Series 10
                </SelectItem>
                <SelectItem className="border-y" value="hermès">
                  Apple Watch Hermès Series 10
                </SelectItem>
                <SelectItem value="se">Apple Watch SE</SelectItem>
              </SelectContent>
            </Select>
            <motion.div
            initial={{
              opacity:0,
               visibility: "hidden"
            }}
            animate={{ 
              opacity: 1,
              visibility: "visible"
            }}
            transition={{
              delay: 1.2,
              duration: 0.5,
              ease: "easeOut",
            }}
            >
            <Button size={"sm"}>Save</Button>
            </motion.div>
          </div>
        )}
      </section>

      <motion.div
        className={cn(
          "w-full lg:w-1/2 flex flex-col mx-auto md:items-start py-8 md:py-0 px-5 lg:px-0 lg:py-4"
        )}
        initial={{ opacity: 1, height: "auto" }}
        animate={isAnimating ? { opacity: 0, height: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <>
          <p className="collectionname w-full">Apple Watch Studio</p>
          <h1 className="w-full">
            Choose a case. <br />
            Pick a band. <br />
            Create your own style.
          </h1>
        </>
        <Button onClick={handleClick} className="mt-[42px] z-20">
          Get started
        </Button>
      </motion.div>

      <div className="relative flex-1 w-full">
        <motion.div
          className={cn(
            "relative w-full flex items-center justify-center",
            "h-[53vh] max-h-[29.8823529412rem] min-h-[18.4705882353rem]"

            // !isAnimating && "transform scale-[1.45] translate-y-[39vh] md:scale-[1.2] md:translate-y-[46vh] lg:scale-[1.4] lg:translate-y-[48vh]"
          )}
          aria-label="46mm Jet Black Aluminum Case with Black Solo Loop Front view"
          initial={{
            transform: "translateY(40vh) scale(1.2)",
          }}
          animate={
            isAnimating
              ? {
                  transform: "translateY(0) scale(0.75)",
                }
              : {
                  transform: "translateY(40vh) scale(1.2)",
                }
          }
          transition={{
            delay: 0.4,
            duration: 1.2,
            ease: "easeInOut",
          }}
        >
          <Image
            height={500}
            width={500}
            src={"/watchface/watch-1.png"}
            alt="Watch-1"
            className="max-w-[500px] max-h-[500px] absolute z-10"
          />
          <Image
            height={500}
            width={500}
            src={"/strap/watchstrap-1.jpeg"}
            alt="Watch-1"
            className="max-w-[500px] max-h-[500px] absolute"
          />
        </motion.div>
      </div>
    </main>
  );
}
