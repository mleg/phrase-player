import { cn } from "@/lib/utils";
import { speedFormatValue } from "@/stores/player";
import { useStore } from "@/stores/StoreContext";
import { delay } from "es-toolkit";
import { observer } from "mobx-react-lite";
import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { DropdownMenuLabel } from "../ui/dropdown-menu";
import { Slider } from "../ui/slider";

interface Props {
  className?: string;
}

export const PlaybackSpeedSlider: React.FC<Props> = observer(
  function PlaybackSpeedSlider(props) {
    const { player } = useStore();
    const { t } = useTranslation();
    const { speed } = player;

    const ref = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
      if (!ref.current || !speed.modal.visible) {
        return;
      }
      const thumb = ref.current.querySelector(`[role="slider"]`);
      if (thumb && document.activeElement !== thumb) {
        delay(0).then(() => (thumb as HTMLElement).focus());
      }
    }, [ref.current, speed.modal.visible]);

    return (
      <DropdownMenuLabel
        ref={ref}
        className={cn("flex flex-col gap-2", props.className)}
      >
        <div className="text-muted-foreground flex gap-2">
          <span>{t("player.speed")}:</span>
          <span>{speedFormatValue(speed.value)}</span>
        </div>
        <Slider
          min={speed.MIN}
          max={speed.MAX}
          step={speed.STEP}
          value={[speed.value]}
          onValueChange={([v]) => speed.setValue(v)}
          className="w-full py-1"
        />
      </DropdownMenuLabel>
    );
  }
);
