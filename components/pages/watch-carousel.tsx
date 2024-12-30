"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { CarouselItem, WatchCustomizationCarouselProps } from "@/types/watch";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";



const WatchCustomizationCarousel: React.FC<WatchCustomizationCarouselProps> = ({
  activeFilter,
  defaultCollection,
  selectedConfig,
  isSideView,
  collection,
  handleSizeChange,
  handleCaseTypeChange,
  handleBandTypeChange,
  handleBandStyleChange,
}) => {
  const initialConfigRef = React.useRef<{
    band: string;
    bandStyle: string;
    caseColor: string;
    collection?: string;
  } | null>(null);

  const currentSize = defaultCollection.caseSizes.find(
    (size) => size.size === selectedConfig.size
  );

  const StaticCase = () => {
    const currentBandStyle = selectedConfig.band.styles.find(
      (style) => style.name === selectedConfig.bandStyle.name
    );

    const specificCaseImage = currentBandStyle?.specificCases?.find(
      (specificCase) => specificCase.caseColor === selectedConfig.caseColor
    )?.image;

    const defaultCaseImage = currentSize?.casesType
      .find((ct) => ct.type === selectedConfig.caseType)
      ?.colors.find((c) => c.name === selectedConfig.caseColor)?.image;

    const imageSrc = specificCaseImage || defaultCaseImage;

    if (!imageSrc) {
      return null;
    }

    return (
      <div className="absolute left-1/2 right-1/2 h-full flex items-center justify-center z-10 scale-[.60] md:scale-75">
        <Image
          height={500}
          width={500}
          src={imageSrc}
          alt={`${selectedConfig.caseType} ${selectedConfig.caseColor}`}
          className="max-w-[500px] max-h-[500px] select-none"
        />
      </div>
    );
  };

  const StaticBand = () => {
    const currentBandStyle = selectedConfig.band.styles.find((style) =>
      style.combinations.some(
        (combo) => combo.caseColor === selectedConfig.caseColor
      )
    );

    return (
      <div className=" absolute w-full h-full flex items-center justify-center scale-[.60] md:scale-75">
        <Image
          height={500}
          width={500}
          src={currentBandStyle?.image || ""}
          alt={`${selectedConfig.band.name}`}
          className="max-w-[500px] max-h-[500px]"
        />
      </div>
    );
  };

  const getInitialIndex = () => {
    if (activeFilter === "size") {
      return defaultCollection.caseSizes.findIndex(
        (size) => size.size === selectedConfig.size
      );
    }
    if (activeFilter === "case") {
      let index = 0;
      for (const caseType of currentSize?.casesType || []) {
        for (const color of caseType.colors) {
          if (
            caseType.type === selectedConfig.caseType &&
            color.name === selectedConfig.caseColor
          ) {
            return index;
          }
          index++;
        }
      }
      return 0;
    }
    if (activeFilter === "band") {
      const allBandStyles: Array<{
        bandName: string;
        styleName: string;
        index: number;
      }> = [];

      let globalIndex = 0;
      (currentSize?.bands || []).forEach((band) => {
        band.styles.forEach((style) => {
          allBandStyles.push({
            bandName: band.name,
            styleName: style.name,
            index: globalIndex,
          });
          globalIndex++;
        });
      });

      const currentIndex = allBandStyles.findIndex(
        (item) =>
          item.bandName === selectedConfig.band.name &&
          item.styleName === selectedConfig.bandStyle.name
      );

      return currentIndex !== -1 ? currentIndex : 0;
    }
    return 0;
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: getInitialIndex(),
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 3,
          spacing: 15,
          origin: "center",
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 5,
          spacing: 25,
          origin: "center",
        },
      },
    },
    slides: {
      perView: 2,
      spacing: 15,
      origin: "center",
    },
    dragSpeed: 1,
    defaultAnimation: {
      duration: 500,
    },
    drag: false,
    created(slider) {
      setLoaded(true);
      slider.moveToIdx(getInitialIndex(), true);
    },
  });

  const handleNavigation = useCallback(
    (direction: "prev" | "next") => {
      if (!instanceRef.current) return;

      console.log(currentSlide);

      const carouselItems = getCarouselItems();

      const currentIndex = carouselItems.findIndex((item) => {
        switch (item.type) {
          case "band":
            return (
              item.bandName === selectedConfig.band.name &&
              item.styleName === selectedConfig.bandStyle.name
            );
          case "case":
            return (
              item.caseType === selectedConfig.caseType &&
              item.color === selectedConfig.caseColor
            );
          case "size":
            return item.size === selectedConfig.size;
          default:
            return false;
        }
      });

      if (
        (direction === "prev" && currentIndex <= 0) ||
        (direction === "next" && currentIndex >= carouselItems.length - 1)
      ) {
        return;
      }

      const newIndex =
        direction === "prev"
          ? Math.max(0, currentIndex - 1)
          : Math.min(carouselItems.length - 1, currentIndex + 1);

      const newItem = carouselItems[newIndex];

      switch (newItem.type) {
        case "band":
          const newBand = currentSize?.bands.find(
            (band) => band.name === newItem.bandName
          );
          const newBandStyle = newBand?.styles.find(
            (style) => style.name === newItem.styleName
          );

          if (newBand && newBandStyle) {
            handleBandTypeChange(newBand.name);
            handleBandStyleChange(newBandStyle.name);
          }
          break;

        case "case":
          handleCaseTypeChange(newItem.caseType, newItem.color);
          break;

        case "size":
          handleSizeChange(newItem.size);
          break;
      }

      instanceRef.current.moveToIdx(newIndex, true);
      setCurrentSlide(newIndex);
    },
    [
      activeFilter,
      currentSize,
      selectedConfig,
      handleBandTypeChange,
      handleBandStyleChange,
      handleCaseTypeChange,
      handleSizeChange,
    ]
  );

  useEffect(() => {
    if (!initialConfigRef.current) {
      initialConfigRef.current = {
        band: selectedConfig.band.name,
        bandStyle: selectedConfig.bandStyle.name,
        caseColor: selectedConfig.caseColor,
      };
    }

    if (!instanceRef.current) return;

    const newIndex = getInitialIndex();

    instanceRef.current.moveToIdx(newIndex, true);
    setCurrentSlide(newIndex);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();

        if (e.key === "ArrowLeft") {
          handleNavigation("prev");
        }
        if (e.key === "ArrowRight") {
          handleNavigation("next");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    selectedConfig.size,
    selectedConfig.caseColor,
    selectedConfig.band.name,
    selectedConfig.bandStyle.name,
    activeFilter,
    currentSize,
    isSideView,
    getInitialIndex,
    handleNavigation,
    collection,
  ]);

  useEffect(() => {
    if (defaultCollection.caseSizes.length > 0) {
      const defaultConfig =
        collection === "series10"
          ? {
              size: "46mm",
              caseType: "Aluminum",
              caseColor: "Jet Black",
              bandName: "Sport Band",
              bandStyle: "Black Sport Band",
            }
          : collection === "hermes"
          ? {
              size: "46mm",
              caseType: "Titanium",
              caseColor: "Silver",
              bandName: "Hermès Grand H",
              bandStyle: "Satiné Grand H",
            }
          : null;

      if (defaultConfig) {
        handleSizeChange(defaultConfig.size);

        const timer = setTimeout(() => {
          handleCaseTypeChange(defaultConfig.caseType, defaultConfig.caseColor);
          handleBandTypeChange(defaultConfig.bandName);
          handleBandStyleChange(defaultConfig.bandStyle);
        }, 0);

        return () => clearTimeout(timer);
      }
    }
  }, [collection]);

  const getCarouselItems = (): CarouselItem[] => {
    if (activeFilter === "size") {
      return defaultCollection.caseSizes.map((size) => {
        const currentBandStyle = selectedConfig.band.styles.find(
          (style) => style.name === selectedConfig.bandStyle.name
        );

        const specificCaseImage = currentBandStyle?.specificCases?.find(
          (specificCase) => specificCase.caseColor === selectedConfig.caseColor
        )?.image;

        const defaultCaseImage = size.casesType
          .find((ct) => ct.type === selectedConfig.caseType)
          ?.colors.find((c) => c.name === selectedConfig.caseColor)?.image;

        const currentBand = size.bands
          .find((b) => b.name === selectedConfig.band.name)
          ?.styles.find((s) => s.name === selectedConfig.bandStyle.name);

        return {
          type: "size",
          caseImage: specificCaseImage || defaultCaseImage || "",
          bandImage: currentBand?.image || "",
          alt: `${size.size} Watch`,
          size: size.size,
        };
      });
    }

    if (activeFilter === "case") {
      const currentBandStyle = selectedConfig.band.styles.find(
        (style) => style.name === selectedConfig.bandStyle.name
      );

      return (
        currentSize?.casesType.flatMap((caseType) =>
          caseType.colors.map((color) => {
            const specificCaseImage = currentBandStyle?.specificCases?.find(
              (specificCase) => specificCase.caseColor === color.name
            )?.image;

            return {
              type: "case",
              image: specificCaseImage || color.image,
              alt: `${caseType.type} ${color.name}`,
              caseType: caseType.type,
              color: color.name,
            };
          })
        ) || []
      );
    }

    if (activeFilter === "band") {
      const flattenedBandStyles: CarouselItem[] = [];

      (currentSize?.bands || []).forEach((band) => {
        const bandStyles = band.styles.map((style) => ({
          type: "band" as const,
          image: style.image,
          alt: `${band.name} ${style.name}`,
          bandName: band.name,
          styleName: style.name,
        }));

        flattenedBandStyles.push(...bandStyles);
      });

      return flattenedBandStyles;
    }

    return [];
  };
  return (
    <div className="relative w-screen watch-image-container h-[53vh]">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          isSideView ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
       
        {activeFilter === "case" && <StaticBand />}
        {activeFilter === "band" && <StaticCase />}

        <div className="relative w-full h-full">
          <div
            aria-label="Choose your watch case"
            ref={sliderRef}
            className="keen-slider  relative h-full"
          >
            {getCarouselItems().map((item, index) => (
              <div
                key={index}
                className="keen-slider__slide flex items-center justify-center watch-image-container"
              >
                <div className=" transition-all duration-300 ease-in-out group">
                <div
                  className={cn(
                    "scale-[.60] md:scale-75 relative",
                    "transition-transform duration-300 ease-in-out",
                    "group-hover:scale-[0.65] group-hover:md:scale-[0.70]",
                    "group-hover:-translate-y-4", 
                    "will-change-transform" 
                  )}
                >
                  {"size" in item ? (
                    <>
                   
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <Image
                          src={item.caseImage || ""}
                          alt={item.alt}
                          width={500}
                          height={500}
                          className="max-w-[500px] max-h-[500px] object-contain"
                          priority
                        />
                      </div>

       
                      <div className="absolute inset-0 flex items-center justify-center z-0">
                        <Image
                          src={item.bandImage || ""}
                          alt={item.alt}
                          width={500}
                          height={500}
                          className="max-w-[500px] max-h-[500px] object-contain"
                          priority
                        />
                      </div>
                    </>
                  ) : (
                  
                    <Image
                      src={item.image || ""}
                      alt={item.alt}
                      width={500}
                      height={500}
                      className="max-w-[500px] max-h-[500px] object-contain"
                      priority
                    />
                  )}
                </div>
                </div>
               
              </div>
            ))}
          </div>

         
          {loaded && instanceRef.current && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigation("prev");
                }}
                disabled={
                  getCarouselItems().findIndex((item) => {
                    switch (item.type) {
                      case "band":
                        return (
                          item.bandName === selectedConfig.band.name &&
                          item.styleName === selectedConfig.bandStyle.name
                        );
                      case "case":
                        return (
                          item.caseType === selectedConfig.caseType &&
                          item.color === selectedConfig.caseColor
                        );
                      case "size":
                        return item.size === selectedConfig.size;
                      default:
                        return false;
                    }
                  }) === 0
                }
                className={cn(
                  "absolute left-2 z-50 top-1/2 -translate-y-1/2",
                  "p-2 rounded-full bg-white/80 shadow-md",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "transition-opacity hover:bg-white"
                )}
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigation("next");
                }}
                disabled={
                  getCarouselItems().findIndex((item) => {
                    switch (item.type) {
                      case "band":
                        return (
                          item.bandName === selectedConfig.band.name &&
                          item.styleName === selectedConfig.bandStyle.name
                        );
                      case "case":
                        return (
                          item.caseType === selectedConfig.caseType &&
                          item.color === selectedConfig.caseColor
                        );
                      case "size":
                        return item.size === selectedConfig.size;
                      default:
                        return false;
                    }
                  }) ===
                  getCarouselItems().length - 1
                }
                className={cn(
                  "absolute right-2 z-50 top-1/2 -translate-y-1/2",
                  "p-2 rounded-full bg-white/80 shadow-md",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "transition-opacity hover:bg-white"
                )}
                aria-label="Next slide"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Side View Container */}
      <div
        className={`absolute inset-0 flex items-center justify-center scale-[.60] md:scale-75 transition-opacity duration-1000 ${
          isSideView ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Image
          height={500}
          width={500}
          src={
            selectedConfig.band.styles
              .find((style) => style.name === selectedConfig.bandStyle.name)
              ?.combinations?.find(
                (combo) => combo.caseColor === selectedConfig.caseColor
              )?.image || ""
          }
          alt={`${selectedConfig.caseType} ${selectedConfig.caseColor} with ${selectedConfig.bandStyle.name}`}
          className="max-w-[500px] max-h-[500px] select-none"
          priority
        />
      </div>
    </div>
  );
};

export default WatchCustomizationCarousel;
