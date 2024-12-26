
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


  interface SelectDialogProps {
    selectedValue: string;
    className?: string;
    onSelect: (value: string) => void;
  }
  
  
const WatchCollection: React.FC<SelectDialogProps> = ({ 
    onSelect ,className,selectedValue
  }) => {
   
    return (
        <Select value={selectedValue} onValueChange={onSelect}>
        <div className={`${className}`}>
          <SelectTrigger>
            <SelectValue
              placeholder="Collections"
              className="placeholder:buttonText placeholder:text-text select-none buttonText text-text"
            >
              Collections
            </SelectValue>
          </SelectTrigger>

          <SelectContent className="items-center z-50">
            <SelectItem className="mb-1" value="watch">
              <span className="w-full text-center">Apple Watch Series 10</span>
              
            </SelectItem>
            <SelectItem className="border-y" value="hermes">
              Apple Watch Hermès Series 10
            </SelectItem>
            <SelectItem value="se">Apple Watch SE</SelectItem>
          </SelectContent>
        </div>
      </Select>
    )
  }

export default WatchCollection