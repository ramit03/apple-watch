"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
    FacebookShareButton, 
    TwitterShareButton, 
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    PinterestShareButton,
    PinterestIcon
  } from "next-share";
import { Share2Icon, CopyIcon, CheckIcon } from "lucide-react";

interface ShareConfigurationDialogProps {
    selectedConfig: {
      size: string;
      caseType: string;
      caseColor: string;
      band: {
        name: string;
      };
      bandStyle: {
        name: string;
      };
    };
  }

  const ShareConfigurationDialog: React.FC<ShareConfigurationDialogProps> = ({ 
    selectedConfig 
  }) => {
    const [shareLink, setShareLink] = useState('');
    const [isCopied, setIsCopied] = useState(false);
  
    const generateShareableLink = () => {
      const configToShare = {
        size: selectedConfig.size,
        caseType: selectedConfig.caseType,
        caseColor: selectedConfig.caseColor,
        bandName: selectedConfig.band.name,
        bandStyle: selectedConfig.bandStyle.name
      };
  
      const jsonConfig = JSON.stringify(configToShare);
      const encodedConfig = Buffer.from(jsonConfig).toString('base64');
      const link = `${window.location.origin}/mywatch?config=${encodedConfig}`;
      
      setShareLink(link);
      return link;
    };
  
    const handleCopyLink = () => {
      navigator.clipboard.writeText(shareLink).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    };
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            className="gap-2 buttonText items-center"
            onClick={generateShareableLink}
            size={"sm"}
          >
            <Share2Icon className="size-1"/>{" "}
            Share
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-white rounded-[18px]">
          <DialogHeader>
            <DialogTitle className="collectionname">Share Your Watch Configuration</DialogTitle>
            <DialogDescription/>
         
          </DialogHeader>
          
          <div className="flex items-center space-x-2">
            <Input 
              value={shareLink} 
              readOnly 
              className="flex-1"
              placeholder="Generated share link will appear here"
            />
            <Button 
              onClick={handleCopyLink}
              size="icon"
              variant="outline"
              disabled={!shareLink}
            >
              {isCopied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
            </Button>
          </div>
  
          <div className="flex justify-center items-center space-x-4 pt-4">
            <PinterestShareButton url={shareLink} media="Check out my custom Apple Watch!">
                <PinterestIcon size={32} round />
            </PinterestShareButton>
            <FacebookShareButton
              url={shareLink}
              quote={'Check out my custom Apple Watch!'}
              hashtag={'#AppleWatch'}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
  
            <TwitterShareButton
              url={shareLink}
              title={'Check out my custom Apple Watch!'}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
  
            <WhatsappShareButton
              url={shareLink}
              title={'Check out my custom Apple Watch!'}
              separator=":: "
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ShareConfigurationDialog;