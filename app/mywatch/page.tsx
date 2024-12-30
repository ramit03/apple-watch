'use client';
import React from "react";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Band, BandStyle } from "@/types/watch";
import WatchCustomization from "@/components/pages/watchcustomization";

interface InitialConfig {
  size?: string;
  caseType?: string;
  caseColor?: string;
  bandName?: string;
  bandStyle?: string;
}

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
  

function MyWatch() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const configParam = searchParams.get("config");

    if (!configParam) {
      router.push("/");
      return;
    }

    try {
      const decodedConfig = Buffer.from(configParam, "base64").toString(
        "utf-8"
      );

      const parsedConfig: InitialConfig = JSON.parse(decodedConfig);

      if (!parsedConfig.size || !parsedConfig.caseType) {
        router.push("/");
      }
    } catch (error) {
      console.error("Invalid configuration link", error);
      router.push("/");
    }
  }, [searchParams, router]);

  const configParam = searchParams.get('config');
  if (!configParam) return null;

  const initialConfig: InitialConfig = JSON.parse(
    Buffer.from(configParam, 'base64').toString('utf-8')
  );

  return <WatchCustomization initialConfig={initialConfig} />;
}

export default MyWatch;
