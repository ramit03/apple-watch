import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectDialogProps {
  selectedValue: string;
  className?: string;
  onSelect: (value: string) => void;
}

const WatchCollection: React.FC<SelectDialogProps> = ({
  onSelect,
  className,
  selectedValue,
}) => {
  return (
    <Select value={selectedValue} onValueChange={onSelect}>
      <div className={`${className}`}>
        <SelectTrigger>
          <SelectValue className="select-none buttonText text-text">
            Collections
          </SelectValue>
        </SelectTrigger>

        <SelectContent className="items-center z-50">
          <SelectItem className="mb-1" value="series10">
            <span className="w-full hover:text-[#0071e3] text-center">Apple Watch Series 10</span>
          </SelectItem>
          <SelectItem className="border-t hover:text-[#0071e3]" value="hermes">
            Apple Watch Hermès Series 10
          </SelectItem>
        </SelectContent>
      </div>
    </Select>
  );
};

export default WatchCollection;
