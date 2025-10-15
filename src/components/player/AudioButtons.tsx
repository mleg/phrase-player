import { cn } from "@/lib/utils";
import { useStore } from "@/stores/StoreContext";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Pause,
  Play,
  Repeat1,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";
import { ControlButton } from "./AudioButton";
import { PlaybackSpeedSelect } from "./PlaybackSpeedSelect";

interface Props {
  className?: string;
}

export const AudioButtons: React.FC<Props> = observer(function AudioButtons(
  props
) {
  const { player, phrases } = useStore();
  const { t } = useTranslation();

  useHotkeys(
    "space",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      player.playPhraseAgain();
    },
    { eventListenerOptions: { capture: true } }
  );

  useHotkeys("P", player.togglePlay);

  useHotkeys(
    "ArrowRight",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      phrases.next();
    },
    {
      enabled: !player.speed.modal.visible,
      eventListenerOptions: { capture: true },
    }
  );

  useHotkeys(
    "ArrowLeft",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      phrases.prev();
    },
    {
      enabled: !player.speed.modal.visible,
      eventListenerOptions: { capture: true },
    }
  );

  useHotkeys("Home", phrases.first, { enabled: !player.speed.modal.visible });
  useHotkeys("End", phrases.last, { enabled: !player.speed.modal.visible });

  return (
    <div
      className={cn(
        "grid grid-flow-col auto-cols-fr grid-rows-2 sm:flex gap-4",
        props.className
      )}
    >
      <ControlButton
        disabled={phrases.isPrevDisabled}
        onClick={phrases.first}
        hotkey="Home"
        className="order-2"
      >
        <ChevronFirst />
      </ControlButton>
      <ControlButton
        disabled={phrases.isPrevDisabled}
        onClick={phrases.prev}
        hotkey="⇽"
        className="order-1"
      >
        <ChevronLeft />
      </ControlButton>
      <ControlButton
        disabled={!phrases.playbackEnabled}
        onClick={player.playPhraseAgain}
        hotkey={t("navigation.hotkeys.space")}
        className="order-3"
      >
        <Repeat1 />
      </ControlButton>
      <ControlButton
        disabled={!phrases.playbackEnabled}
        onClick={player.togglePlay}
        hotkey="P"
        className="order-5"
      >
        {player.isPlaying ? <Pause /> : <Play />}
      </ControlButton>
      <ControlButton
        disabled={phrases.isNextDisabled}
        onClick={phrases.next}
        hotkey="⇾"
        className="order-7"
      >
        <ChevronRight />
      </ControlButton>
      <ControlButton
        disabled={phrases.isNextDisabled}
        onClick={phrases.last}
        hotkey="End"
        className="order-8"
      >
        <ChevronLast />
      </ControlButton>
      <PlaybackSpeedSelect className="order-6 sm:order-none" />
      <ControlButton
        disabled={phrases.list.length === 0}
        onClick={phrases.select.show}
        className="order-4"
      >
        <Ellipsis />
      </ControlButton>
    </div>
  );
});
