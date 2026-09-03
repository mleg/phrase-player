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
        aria-label={t("controls.first")}
        disabled={phrases.isPrevDisabled}
        onClick={phrases.first}
        hotkey="Home"
        className="order-2"
      >
        <ChevronFirst />
      </ControlButton>
      <ControlButton
        aria-label={t("controls.previous")}
        disabled={phrases.isPrevDisabled}
        onClick={phrases.prev}
        className="order-1"
        hotkey="⇽"
      >
        <ChevronLeft />
      </ControlButton>
      <ControlButton
        aria-label={t("controls.replay")}
        disabled={!phrases.playbackEnabled}
        onClick={player.playPhraseAgain}
        className="order-3"
        hotkey={t("navigation.hotkeys.space")}
      >
        <Repeat1 />
      </ControlButton>
      <ControlButton
        aria-label={player.isPlaying ? t("controls.pause") : t("controls.play")}
        disabled={!phrases.playbackEnabled}
        onClick={player.togglePlay}
        className="order-5"
        hotkey="P"
      >
        {player.isPlaying ? <Pause /> : <Play />}
      </ControlButton>
      <ControlButton
        aria-label={t("controls.next")}
        disabled={phrases.isNextDisabled}
        onClick={phrases.next}
        className="order-7"
        hotkey="⇾"
      >
        <ChevronRight />
      </ControlButton>
      <ControlButton
        aria-label={t("controls.last")}
        disabled={phrases.isNextDisabled}
        onClick={phrases.last}
        className="order-8"
        hotkey="End"
      >
        <ChevronLast />
      </ControlButton>
      <PlaybackSpeedSelect className="order-6 sm:order-none" />
      <ControlButton
        aria-label={t("controls.phrase_list")}
        disabled={phrases.list.length === 0}
        onClick={phrases.select.show}
        className="order-4"
      >
        <Ellipsis />
      </ControlButton>
    </div>
  );
});
