"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isSizeVisible, setIsSizeVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
    
  };

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsSizeVisible(false), 1500); // Hide "Size" after 0.5 seconds
    setTimeout(() => {
      setIsSizeVisible(true);
    }, 3100);
  };

  return (
    <main className="flex flex-col h-screen overflow-hidden ">
      <section
        className={cn(
          "m-4 flex gap-2 flex-col lg:flex-row lg:justify-between justify-start py-1 md:py-0 md:m-[34px] md:mb-[45px]",
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
        {isAnimating && (
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
                opacity: 0,
                visibility: "hidden",
              }}
              animate={{
                opacity: 1,
                visibility: "visible",
              }}
              transition={{
                delay: 1.2,
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <Button className="hidden lg:flex" size={"sm"}>
                Save
              </Button>
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
                opacity: 0,
                visibility: "hidden",
              }}
              animate={{
                opacity: 1,
                visibility: "visible",
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

      <div className="relative w-full">
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

      <div className={cn("flex flex-col gap-1 px-8 py-4 text-center  transition-opacity duration-6000",isAnimating? 'visible opacity-100':'invisible opacity-0')}>
        <p className="sideText mb-2">Side view</p>
        <h6 className="watchSeries">apple watch series 10</h6>
        <h5 className="watchName line-clamp-3">
          46mm Jet Black Aluminum Case with Black Solo Loop{" "}
        </h5>
        <p className="watchName font-normal">From $429</p>
      </div>

      <div className={cn("flex flex-row items-center gap-3 px-8 justify-center transition-opacity duration-6000",isAnimating? 'visible opacity-100':'invisible opacity-0')}>
        <Button
          className="flex items-center justify-center gap-1"
          variant={"filter"}
          size={"filter"}
        >
          <Image src={"/icons/size.svg"} width={16} height={21} alt="Size" />
          <div className="relative flex items-center">
            <motion.span
              key="size-text"
              className="overflow-hidden inline-block"
            >
              {isSizeVisible ? (
              <> Size</> 
              ) : (
                <AnimatePresence mode="sync">
                  {isAnimating && (
                    <motion.ul
                      key="size-options"
                      initial={{ maxWidth: 0, overflow: "hidden" }}
                      animate={
                        isAnimating
                          ? {
                              maxWidth: [0, 300, 0],
                              overflow: ["hidden", "hidden", "hidden"],
                            }
                          : { maxWidth: 0, overflow: "hidden" }
                      }
                      transition={{            
                        duration: 1.75, 
                        ease: "easeInOut",
                      }}
                      className="flex gap-6"
                    >
                      <li>
                        <label
                          htmlFor="42"
                          className="has-[:checked]:opacity-100 opacity-30 hover:cursor-pointer"
                        >
                          {" "}
                          <input
                            hidden
                            id="42"
                            type="radio"
                            name="size"
                            value="42mm"
                          />
                          42mm
                        </label>
                      </li>
                      <li>
                        <label
                          className="opacity-30 has-[:checked]:opacity-100 hover:cursor-pointer"
                          htmlFor="46"
                        >
                          {" "}
                          <input
                            hidden
                            id="46"
                            type="radio"
                            name="size"
                            value="46mm"
                            defaultChecked
                          />
                          46mm
                        </label>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              )}
            </motion.span>
          </div>
        </Button>
        <Button className="flex gap-1" variant={"filter"} size={"filter"}>
          <Image src={"/icons/case.svg"} width={13} height={21} alt="Size" />
          Case
        </Button>
        <Button className="flex gap-1" variant={"filter"} size={"filter"}>
          <Image
            src={"/icons/band.svg"}
            className="object-cover"
            width={9}
            height={21}
            alt="Size"
          />
          Band
        </Button>
      </div>
    </main>
  );
}
