"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import WatchCollection from "@/components/pages/watch-collection";

type Collection = {
  id: string;
  name: string;
};

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSizeVisible, setIsSizeVisible] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] =
    useState<string>('watch');

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const sizeOptionsRef = useRef(null);


  useGSAP(() => {
    const timeline = gsap.timeline({ paused: true });
    gsap.to("#main", {
      opacity: 1,
      delay: 1,
      duration: 1,
    });

    timeline
      .to("#desc", {
        opacity: 0,
        duration: 0.5,
      })
      .to(
        "#desc",
        {
          height: 0,
          duration: 1.9,
        },
        "<"
      )
      .fromTo(
        "#watchfirst",
        {
          yPercent: 40,
          scale: 1.2,
        },
        {
          yPercent: -10,
          scale: 0.75,
          duration: 1.8,
        },
        "<"
      )
      .fromTo(
        ".select",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
        }
      )
      .fromTo(
        ".save",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
        },
        "<"
      );

    timelineRef.current = timeline;
  }, []);

  useGSAP(() => {
    if (sizeOptionsRef.current) {
      gsap.fromTo(
        sizeOptionsRef.current,
        {
          maxWidth: 0,
          overflow: "hidden",
        },
        {
          maxWidth: 300,
          duration: 1.75,
          ease: "easeInOut",
          onComplete: () => {
            gsap.to(sizeOptionsRef.current, {
              maxWidth: 0,
              duration: 1.75,
              ease: "easeInOut",
              onUpdate: () => {
                const progress = gsap.getProperty(
                  sizeOptionsRef.current,
                  "maxWidth"
                ) as number;
                if (progress < 30) {
                  setIsSizeVisible(true);
                }
              },
            });
          },
        }
      );
    }
  }, [isSizeVisible]);

  const handleButtonClick = (button: string) => {
    setActiveFilter((prev) => (prev === button ? null : button));
  };

  const handleClick = () => {
    setIsAnimating(true);
    if (timelineRef.current) {
      timelineRef.current.play(); // Restart the animation
    }

    setTimeout(() => {
      setIsSizeVisible(false);
    }, 2600);
  };

 const handleCollectionSelect = (value:string) => {
    setSelectedCollection(value);
  }


  return (
    <main
      id="main"
      className="opacity-0 flex h-full flex-col min-h-[100dvh] overflow-x-hidden"
    >
      <section
        className={cn(
          "mx-4 mt-4 flex gap-2 flex-col lg:flex-row lg:justify-between justify-start py-1 md:py-0 md:mx-[34px] md:mt-[34px] md:mb-[45px]",
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

        <>
          <WatchCollection className="select hidden lg:flex" selectedValue={selectedCollection} onSelect={handleCollectionSelect} />
      
          <div className="save">
            <Button className="hidden lg:flex" size={"sm"}>
              Save
            </Button>
          </div>
        </>

        <div className="w-full select lg:hidden flex flex-row items-center justify-between">
          <WatchCollection selectedValue={selectedCollection} onSelect={handleCollectionSelect} />
          <div className="save">
            <Button size={"sm"}>Save</Button>
          </div>
        </div>
      </section>
      <div
        id="desc"
        className={cn(
          "w-full opacity-100 lg:w-1/2 flex flex-col mx-auto md:items-start py-8 md:py-0 px-5 lg:px-0 lg:py-4"
        )}
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
      </div>

      <div
        id="watchfirst"
        className=" relative bottom-0 w-full flex items-center justify-center h-[53dvh] "
        // transform scale-[1] translate-y-[20vh] md:scale-[1.2] md:translate-y-[46vh] lg:scale-[1.4] lg:translate-y-[48vh]"
        aria-label="46mm Jet Black Aluminum Case with Black Solo Loop Front view"
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
          priority
          src={"/strap/watchstrap-1.jpeg"}
          alt="Watch-1"
          className="max-w-[500px] max-h-[500px] absolute"
        />
      </div>

      <div
        className={cn(
          "flex flex-col gap-1 px-8 py-4 text-center  transition-opacity duration-6000",
          isAnimating ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <p className="sideText mb-2">Side view</p>
        <h6 className="watchSeries">apple watch series 10</h6>
        <h5 className="watchName line-clamp-3">
          46mm Jet Black Aluminum Case with Black Solo Loop{" "}
        </h5>
        <p className="watchName font-normal">From $429</p>
      </div>

      <div
        className={cn(
          "flex flex-row items-center gap-3 px-8 justify-center transition-opacity duration-6000",
          isAnimating ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div
         className={cn(
          `filter ${activeFilter === "size" && "filter-expanded"}`
        )}>
        <Button
          className="flex items-center gap-1"
          variant={"filter"}
          onClick={() => handleButtonClick("size")}
          size={"filter"}
          disabled={activeFilter === "size"}
        >
          <Image src={"/icons/size.svg"} width={16} height={21} alt="Size" />
          <div className="relative flex items-center">
            <span key="size-text" className="overflow-hidden inline-block">
              {isSizeVisible ? (
                <>{activeFilter === 'size' ? (
                  <ul ref={sizeOptionsRef}  className={cn("flex gap-6 filter-options pointer-events-auto")}>
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
                </ul>
                ): 'Size'} </>
              ) : (
                <>
                  {isAnimating && (
                    <ul ref={sizeOptionsRef}  className={cn("flex gap-6")}>
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
                    </ul>
                  )}
                </>
              )}
            </span>
          </div>
        </Button>
        </div>
      

        <div
          className={cn(
            `filter ${activeFilter === "case" && "filter-expanded"}`
          )}
        >
          <Button
            onClick={() => handleButtonClick("case")}
            className="flex gap-1 items-center"
            variant={"filter"}
            size={"filter"}
            disabled={activeFilter === "case"}
          >
            <Image src={"/icons/case.svg"} width={13} height={21} alt="Case" />

            {activeFilter === "case" ? (
              <ul
                className={cn("flex gap-6 filter-options pointer-events-auto")}
              >
                <li>
                  <label
                    htmlFor="aluminum"
                    className="has-[:checked]:opacity-100 opacity-30 hover:cursor-pointer"
                  >
                    <input
                      hidden
                      id="aluminum"
                      type="radio"
                      name="case"
                      defaultChecked
                      value="aluminum"
                    />
                    Aluminum
                  </label>
                </li>
                <li>
                  <label
                    htmlFor="titanium"
                    className="has-[:checked]:opacity-100 opacity-30 hover:cursor-pointer"
                  >
                    <input
                      hidden
                      id="titanium"
                      type="radio"
                      name="case"
                      value="titanium"
                    />
                    Titanium
                  </label>
                </li>
              </ul>
            ) : (
              "Case"
            )}
          </Button>
        </div>

        <div
          className={cn(
            `${activeFilter === "band" && "filter-expanded"}`
          )}
        >
          <Button
            onClick={() => handleButtonClick("band")}
            className="flex gap-1 "
            variant={"filter"}
            size={"filter"}
            disabled={activeFilter === "band"}
          >
            <Image
              src={"/icons/band.svg"}
              className="object-cover"
              width={9}
              height={21}
              alt="Size"
            />
            {activeFilter === "band" ? (
              <ul
                className={cn("flex gap-6 filter-options pointer-events-auto")}
              >
                <li>
                  <label
                    htmlFor="aluminum"
                    className="has-[:checked]:opacity-100 opacity-30 hover:cursor-pointer"
                  >
                    <input
                      hidden
                      id="aluminum"
                      type="radio"
                      name="case"
                      defaultChecked
                      value="tluminum"
                    />
                    Aluminum
                  </label>
                </li>
                <li>
                  <label
                    htmlFor="titanium"
                    className="has-[:checked]:opacity-100 opacity-30 hover:cursor-pointer"
                  >
                    <input
                      hidden
                      id="titanium"
                      type="radio"
                      name="case"
                      value="titanium"
                    />
                    Titanium
                  </label>
                </li>
              </ul>
            ) : (
              "Band"
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}
