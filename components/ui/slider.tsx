"use client";

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Band, Collection } from '@/types/watch';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

interface WatchCustomizationCarouselProps {
  activeFilter: string | null;
  defaultCollection: Collection;
  selectedConfig: {
    size: string;
    caseType: string;
    caseColor: string;
    band: Band;
  };
  handleSizeChange: (size: string) => void;
  handleCaseTypeChange: (caseType: string) => void;
  handleBandTypeChange: (bandName: string) => void;
}

const WatchCustomizationCarousel: React.FC<WatchCustomizationCarouselProps> = ({
  activeFilter,
  defaultCollection,
  selectedConfig,
  handleSizeChange,
  handleCaseTypeChange,
  handleBandTypeChange,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSize = defaultCollection.caseSizes.find(
    (size) => size.size === selectedConfig.size
  );

  const StaticCase = () => {
    const currentCase = currentSize?.casesType
      .find(ct => ct.type === selectedConfig.caseType)
      ?.colors.find(c => c.name === selectedConfig.caseColor);

    return (
      <div className="absolute w-full h-full flex items-center justify-center">
        <Image
          height={500}
          width={500}
          src={currentCase?.image || ''}
          alt={`${selectedConfig.caseType} ${selectedConfig.caseColor}`}
          className="max-w-[500px] max-h-[500px] z-10 select-none"
        />
      </div>
    );
  };

  const StaticBand = () => {
    const currentBandStyle = selectedConfig.band.styles.find(
      style => style.combinations.some(combo => combo.caseColor === selectedConfig.caseColor)
    );

    return (
      <div className="absolute w-full h-full flex items-center justify-center">
        <Image
          height={500}
          width={500}
          src={currentBandStyle?.image || ''}
          alt={`${selectedConfig.band.name}`}
          className="max-w-[500px] max-h-[500px]"
        />
      </div>
    );
  };

  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const slides = carousel.children;
    const slideWidth = window.innerWidth / 3;
    
    // Initial center position
    const centerOffset = (window.innerWidth - slideWidth) / 2;
    gsap.set(carousel, {
      x: centerOffset - (slideWidth * currentIndex)
    });

    const draggable = Draggable.create(carousel, {
      type: 'x',
      edgeResistance: 0.9,
      dragResistance: 0.5,
      inertia: true,
      snap: function(endValue) {
        const snapIndex = Math.round(-(endValue - centerOffset) / slideWidth);
        const snapPosition = centerOffset - (snapIndex * slideWidth);
        
        // Animate to the snap position smoothly
        gsap.to(carousel, {
          x: snapPosition,
          duration: 0.3,
          ease: "power2.out"
        });
        
        return snapPosition;
      },
      onDrag: function() {
        const newIndex = Math.round(-(this.x - centerOffset) / slideWidth);
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < slides.length) {
          setCurrentIndex(newIndex);
        }
      },
      onDragEnd: function() {
        const newIndex = Math.round(-(this.x - centerOffset) / slideWidth);
        if (newIndex >= 0 && newIndex < slides.length) {
          handleItemSelect(newIndex);
        }
      }
    })[0];

    // Handle window resize
    const handleResize = () => {
      const newSlideWidth = window.innerWidth / 3;
      const newCenterOffset = (window.innerWidth - newSlideWidth) / 2;
      
      gsap.set(carousel, {
        x: newCenterOffset - (newSlideWidth * currentIndex)
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      draggable.kill();
    };
}, [activeFilter, currentIndex]);

  const handleItemSelect = (index: number) => {
    if (!carouselRef.current) return;

    const items = getCarouselItems();
    if (index >= items.length) return;

    if (activeFilter === 'case') {
      const caseTypes = currentSize?.casesType.flatMap(ct => ct.colors);
      const selectedCase = caseTypes?.[index];
      if (selectedCase) {
        const caseType = currentSize?.casesType.find(ct => 
          ct.colors.some(c => c.name === selectedCase.name)
        );
        if (caseType) {
          handleCaseTypeChange(caseType.type);
        }
      }
    } else if (activeFilter === 'band') {
      const bandStyles = currentSize?.bands.flatMap(band => 
        band.styles.map(style => ({ bandName: band.name, style }))
      );
      const selectedBand = bandStyles?.[index];
      if (selectedBand) {
        handleBandTypeChange(selectedBand.bandName);
      }
    }
  };

  const getCarouselItems = () => {
    if (activeFilter === 'case') {
      return currentSize?.casesType.flatMap(caseType =>
        caseType.colors.map(color => ({
          image: color.image,
          alt: `${caseType.type} ${color.name}`
        }))
      ) || [];
    }

    if (activeFilter === 'band') {
      return currentSize?.bands.flatMap(band =>
        band.styles.map(style => ({
          image: style.image,
          alt: `${band.name} ${style.name}`
        }))
      ) || [];
    }

    return [];
  };

  return (
    <div className="relative w-screen h-full">
      {activeFilter === 'case' && <StaticBand />}
      {activeFilter === 'band' && <StaticCase />}
      
      <div className="relative w-screen overflow-hidden">
        <div 
          ref={carouselRef} 
          className="flex items-center cursor-grab active:cursor-grabbing"
        >
          {getCarouselItems().map((item, index) => (
            <div
              key={index}
              className="w-[calc(100vw/3)] flex-shrink-0"
            >
              <div className="relative flex items-center justify-center h-[53dvh]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={500}
                  height={500}
                  className="max-w-[500px] max-h-[500px] object-contain"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchCustomizationCarousel;