import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { speedFormatValue } from "@/stores/player";
import type { Preset } from "@/stores/speed-store";
import { useStore } from "@/stores/StoreContext";
import type { TFunction } from "i18next";
import { Check, Gauge } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";
import { IconLarge } from "../common/IconLarge";
import { Button } from "../ui/button";
import { Kbd } from "../ui/kbd";
import { PlaybackSpeedSlider } from "./PlaybackSpeedSlider";

interface Props {
  className?: string;
}

const renderItem = (preset: Preset, t: TFunction) => (
  <DropdownMenuItem
    key={preset.value}
    onSelect={preset.onSelect}
    disabled={preset.isChosen}
    className="pl-6 relative"
  >
    {preset.isChosen && <Check className="size-4 absolute left-1" />}
    <span>{preset.value === 1 ? t("player.normal") : preset.value}</span>
  </DropdownMenuItem>
);

export const PlaybackSpeedSelect: React.FC<Props> = observer(
  function PlaybackSpeedSelect(props) {
    const { player } = useStore();
    const { t } = useTranslation();
    const { speed } = player;

    useHotkeys(
      "ArrowDown",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        speed.decrease();
      },
      {
        enabled: !player.speed.modal.visible,
        eventListenerOptions: { capture: true },
      }
    );

    useHotkeys(
      "ArrowUp",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        speed.increase();
      },
      {
        enabled: !player.speed.modal.visible,
        eventListenerOptions: { capture: true },
      }
    );

    return (
      <div
        className={cn(
          "flex flex-col items-center gap-0 sm:gap-1",
          props.className
        )}
      >
        <DropdownMenu open={speed.modal.visible} onOpenChange={speed.modal.set}>
          <DropdownMenuTrigger asChild>
            <Button size="lg" className="px-4 relative">
              <div
                data-name="speed-value"
                className="hidden sm:block absolute left-0 right-0 -top-6 text-sm leading-none sm:leading-[1.5] text-center text-muted-foreground"
              >
                {speedFormatValue(speed.value)}
              </div>
              <IconLarge className="hidden sm:flex">
                <Gauge />
              </IconLarge>
              <div className="flex sm:hidden text-lg w-6 justify-center">
                {speed.value.toFixed(2)}
              </div>
              <div className="hidden sm:flex absolute -bottom-7">
                <Kbd className="text-sm">🠛</Kbd>
                <Kbd className="text-sm">🠙</Kbd>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-60 flex flex-col">
            <PlaybackSpeedSlider />
            <DropdownMenuSeparator />
            {speed.presets.map((preset) => renderItem(preset, t))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);
