'use client';
import React, { Suspense } from "react";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import WatchCustomization from "@/components/pages/watchcustomization";

interface InitialConfig {
  size?: string;
  caseType?: string;
  caseColor?: string;
  bandName?: string;
  bandStyle?: string;
}

function MyWatchContent() {
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

export default function MyWatch(){
  return(
    <Suspense fallback={<div>Loading...</div>}>
    <MyWatchContent />
    </Suspense>
  )
};
