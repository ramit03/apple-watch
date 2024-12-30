"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useWatchConfig } from "@/lib/useWatchConfig";
import { Band, BandStyle, Collection } from "@/types/watch";
import { watches } from "@/constants/watches/watches";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
interface WatchCustomizationProps {
  initialConfig?: {
    size?: string;
    caseType?: string;
    caseColor?: string;
    bandName?: string;
    bandStyle?: string;
  };
}

interface SelectedConfig {
  size: string;
  caseType: string;
  caseColor: string;
  band: Band;
  bandStyle: BandStyle;
}

const WatchCustomization: React.FC<WatchCustomizationProps> = ({
  initialConfig,
}) => {
  const {
    selectedConfig,
    calculatePrice,
    handleSizeChange,
    handleCaseTypeChange,
    handleBandTypeChange,
    handleBandStyleChange,
  } = useWatchConfig();

  useEffect(() => {
    if (initialConfig) {
      const defaultCollection = watches[0];

      if (initialConfig.size) {
        handleSizeChange(initialConfig.size);
      }

      if (initialConfig.caseType && initialConfig.caseColor) {
        handleCaseTypeChange(initialConfig.caseType, initialConfig.caseColor);
      }

      if (initialConfig.bandName) {
        handleBandTypeChange(initialConfig.bandName);
      }

      if (initialConfig.bandStyle) {
        handleBandStyleChange(initialConfig.bandStyle);
      }
    }
  }, [initialConfig]);

  const [isSideView, setIsSideView] = useState(false);

  const getCurrentImage = (): { caseImage: string | null, bandImage: string | null } | null => {
    const currentBandStyle = selectedConfig.band.styles.find(
      (style) => style.name === selectedConfig.bandStyle.name
    );
  
    if (isSideView) {
 
      const sideViewImage = currentBandStyle?.combinations?.find(
        (combo) => combo.caseColor === selectedConfig.caseColor
      )?.image || null;
  
      return sideViewImage ? { caseImage: sideViewImage, bandImage: null } : null;
    } else {
      const currentSize = watches[0].caseSizes.find(
        size => size.size === selectedConfig.size
      );
  
      const caseImage = currentBandStyle?.specificCases?.find(
        (specificCase) => specificCase.caseColor === selectedConfig.caseColor
      )?.image || 
      currentSize?.casesType
        .find((ct) => ct.type === selectedConfig.caseType)
        ?.colors.find((c) => c.name === selectedConfig.caseColor)?.image;
  
      const currentBand = currentSize?.bands
        .find((b) => b.name === selectedConfig.band.name)
        ?.styles.find((s) => s.name === selectedConfig.bandStyle.name);
  
      return {
        caseImage: caseImage || null,
        bandImage: currentBand?.image || null
      };
    }
  };
  
  const currentImage = getCurrentImage();

  return (
    <div className=" flex w-screen h-full items-center justify-center select-none flex-col min-h-[90dvh] overflow-x-hidden">
      <section
        className={cn(
          "absolute inset-0 h-fit mx-4 mt-4 flex gap-2 flex-col lg:flex-row lg:justify-between justify-start py-1 md:py-0 md:mx-[34px] md:mt-[34px] md:mb-[45px]"
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
       
      </section>


      <div className="watch-image-section space-y-20">
           {currentImage && (
            <div className="image-container relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
              {isSideView ? (
                <Image
                  src={currentImage.caseImage!}
                  alt={`Side view of ${selectedConfig.caseType} ${selectedConfig.caseColor}`}
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain"
                />
              ) : (
                <>
                  {currentImage.caseImage && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <Image
                        src={currentImage.caseImage}
                        alt={`Case of ${selectedConfig.caseType} ${selectedConfig.caseColor}`}
                        width={500}
                        height={500}
                        className="max-w-[500px] max-h-[500px] object-contain"
                      />
                    </div>
                  )}
                  {currentImage.bandImage && (
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                      <Image
                        src={currentImage.bandImage}
                        alt={`Band of ${selectedConfig.band.name}`}
                        width={500}
                        height={500}
                        className="max-w-[500px] max-h-[500px] object-contain"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          )}

        <div className="watch-details-section text-center px-6">
          <p
            className="sideText w-full mb-2 cursor-pointer"
            onClick={() => setIsSideView(!isSideView)}
          >
            {isSideView ? "Front view" : "Side view"}
          </p>

          <h6 className="watchSeries">apple watch series 10</h6>

          <h5 className="watchName line-clamp-3 px-2">
            {selectedConfig.size} {selectedConfig.caseColor}{" "}
            {selectedConfig.caseType} Case with {selectedConfig.bandStyle.name}{" "}
          </h5>

          <p className="watchName font-normal">From ${calculatePrice()}</p>
          <Link href={'/'}>
          <Button className="mt-6" size={"sm"}>Build My Watch</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WatchCustomization;
