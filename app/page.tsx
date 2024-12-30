"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import WatchCollection from "@/components/pages/watch-collection";
import { useWatchConfig } from "@/lib/useWatchConfig";
import WatchCustomizationCarousel from "@/components/pages/watch-carousel";
import ShareConfigurationDialog from "@/components/pages/share-config";
import Link from "next/link";

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSizeVisible, setIsSizeVisible] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string>("watch");
  const [isSideView, setIsSideView] = useState<boolean>(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const watchRef = useRef<HTMLDivElement>(null);
  const sizeOptionsRef = useRef(null);

  const {
    defaultCollection,
    selectedConfig,
    handleSizeChange,
    handleCaseTypeChange,
    handleBandStyleChange,
    handleBandTypeChange,
    calculatePrice,
  } = useWatchConfig(selectedCollection);

  useGSAP(() => {
    const timeline = gsap.timeline({ paused: true });
    const mm = gsap.matchMedia();

    mm.add(
      {
        small: "(max-width: 425px)",
        medium: "(min-width: 426px) and (max-width: 1023px)",
        large: "(min-width: 1024px)",
      },
      (context) => {
        const { small, medium } = context.conditions as gsap.Conditions;

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
            watchRef.current,
            {
              yPercent: small ? 20 : 60,
              scale: small ? 1 : medium ? 1.7 : 1.6,
              width: "100%",
            },
            {
              yPercent: -20,
              scale: 0.75,
              width: "100%",
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
      }
    );
    gsap.to("#main", {
      opacity: 1,
      delay: 1,
      duration: 1,
    });

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
      timelineRef.current.play();
    }

    setTimeout(() => {
      setIsSizeVisible(false);
    }, 2600);
  };

  const handleCollectionSelect = (value: string) => {
    setSelectedCollection(value);
  };

  return (
    <main
      id="main"
      className="opacity-0 grow flex w-screen h-full select-none flex-col min-h-[100dvh] overflow-x-hidden"
    >
      <section
        className={cn(
          "mx-4 mt-4 flex gap-2 flex-col lg:flex-row lg:justify-between justify-start py-1 md:py-0 md:mx-[34px] md:mt-[34px] md:mb-[45px]",
          isAnimating ? "items-center md:items-start" : "items-start"
        )}
      >
        <Link href={'/'}>
        <Image
          src={"/logo.webp"}
          className="md:w-[90px] md:h-[20px] "
          width={76.5}
          height={18.5}
          alt="Apple Watch"
        />
        </Link>
       

        <>
          <WatchCollection
            className="select hidden lg:flex"
            selectedValue={selectedCollection}
            onSelect={handleCollectionSelect}
          />

          <div className="save hidden lg:flex">
            <ShareConfigurationDialog selectedConfig={selectedConfig} />
          </div>
        </>

        <div className="w-full select lg:hidden flex flex-row items-end justify-between">
          <WatchCollection
            selectedValue={selectedCollection}
            onSelect={handleCollectionSelect}
          />
          <div className="save">
           <ShareConfigurationDialog selectedConfig={selectedConfig} />
          </div>
        </div>
      </section>
      <div className="flex-1 flex items-start justify-center">
        <div
          id="desc"
          className={cn(
            " opacity-100 w-fit flex flex-col md:items-start pb-8 md:py-0 px-5 lg:px-0 lg:py-4"
          )}
        >
          <>
            <p className="collectionname w-full">Apple Watch Studio</p>
            <h1 className="w-full text-[40px] md:text-[64px]">
              Choose a case. <br />
              Pick a band. <br />
              Create your own style.
            </h1>
          </>
          <Button onClick={handleClick} className="mt-[42px] z-20">
            Get started
          </Button>
        </div>
      </div>

      {activeFilter === null ? (
        <div
          ref={watchRef}
          className="relative w-screen flex items-center justify-center watch-image-container "
          aria-label="46mm Jet Black Aluminum Case with Black Solo Loop Front view"
        >
          {" "}
          <>
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
          </>
        </div>
      ) : (
        <WatchCustomizationCarousel
          activeFilter={activeFilter}
          defaultCollection={defaultCollection}
          selectedConfig={selectedConfig}
          handleSizeChange={handleSizeChange}
          handleCaseTypeChange={handleCaseTypeChange}
          handleBandTypeChange={handleBandTypeChange}
          handleBandStyleChange={handleBandStyleChange}
          isSideView={isSideView}
          collection={selectedCollection}
        />
      )}

      <div
        className={cn(
          "flex flex-col items-center gap-1 px-8 py-4 text-center  transition-opacity duration-6000",
          isAnimating ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <p 
  className="sideText w-fit mb-2 cursor-pointer" 
  onClick={() => setIsSideView(!isSideView)}
>
  {isSideView ? 'Front view' : 'Side view'}
</p>
        <h6 className="watchSeries">apple watch series 10</h6>
        <h5 className="watchName line-clamp-3">
          {selectedConfig.size} {selectedConfig.caseColor}{" "}
          {selectedConfig.caseType} Case with {selectedConfig.bandStyle.name}{" "}
        </h5>
        <p className="watchName font-normal">From ${calculatePrice()}</p>
      </div>

      <div
        className={cn(
          "flex flex-row items-center gap-3 overflow-x-scroll px-8 justify-center transition-opacity duration-6000",
          isAnimating ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div
          className={cn(
            `filter ${activeFilter === "size" && "filter-expanded"}`
          )}
        >
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
                  <>
                    {activeFilter === "size" ? (
                      <ul
                        ref={sizeOptionsRef}
                        className={cn(
                          "flex gap-6 filter-options pointer-events-auto"
                        )}
                      >
                        {defaultCollection.caseSizes.map((size) => {
                          const isSelected = selectedConfig.size === size.size;
                          return (
                            <li key={size.size}>
                              <label
                                htmlFor={size.size}
                                className="has-[:checked]:opacity-100 opacity-30 hover:cursor-pointer"
                              >
                                {" "}
                                <input
                                  hidden
                                  id={size.size}
                                  type="radio"
                                  name="size"
                                  value={size.size}
                                  onChange={() => handleSizeChange(size.size)}
                                  checked={isSelected}
                                />
                                {size.size}
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      "Size"
                    )}{" "}
                  </>
                ) : (
                  <>
                    {isAnimating && (
                      <ul ref={sizeOptionsRef} className={cn("flex gap-6")}>
                        <li>
                          <label htmlFor="42" className=" hover:cursor-pointer">
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
                          <label className=" hover:cursor-pointer" htmlFor="46">
                            {" "}
                            <input
                              hidden
                              id="46"
                              type="radio"
                              name="size"
                              value="46mm"
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
                {defaultCollection.caseSizes
                  .find((size) => size.size === selectedConfig.size)
                  ?.casesType.map((type) => {
                    const isSelected = type.colors.some(
                      (color) =>
                        selectedConfig.caseType === type.type &&
                        selectedConfig.caseColor === color.name
                    );
                    return (
                      <li key={type.type}>
                        <label
                          htmlFor={type.type}
                          className="has-[:checked]:opacity-100 opacity-30 hover:cursor-pointer"
                        >
                          <input
                            hidden
                            id={type.type}
                            type="radio"
                            name="case"
                            checked={isSelected}
                            value={type.type}
                            onChange={() => handleCaseTypeChange(type.type, type.colors[0].name)}
                          />
                          {type.type}
                        </label>
                      </li>
                    );
                  })}
              </ul>
            ) : (
              "Case"
            )}
          </Button>
        </div>

        <div className={cn(`${activeFilter === "band" && "filter-expanded"}`)}>
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
                {defaultCollection.caseSizes
                  .find((size) => size.size === selectedConfig.size)
                  ?.bands.map((band) => {
                    const isSelected = selectedConfig.band.name === band.name;

                    return (
                      <li key={band.name}>
                        <label
                          key={band.name}
                          htmlFor={band.name}
                          className="has-[:checked]:opacity-100 opacity-30 hover:cursor-pointer"
                        >
                          <input
                            hidden
                            id={band.name}
                            type="radio"
                            name="case"
                            checked={isSelected}
                            onChange={() => {
                              handleBandTypeChange(band.name);
                              handleBandStyleChange(band.styles[0].name);
                            }}
                          />
                          {band.name}
                        </label>
                      </li>
                    );
                  })}
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
