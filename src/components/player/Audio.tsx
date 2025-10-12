import { useStore } from "@/stores/StoreContext";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";

export const Audio: React.FC = observer(() => {
  const { player, phrases } = useStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    const audio = audioRef.current;

    if (player.isPlaying) {
      audio.currentTime = player.playFrom;
      audio.play();
    } else {
      audio.pause();
    }
  }, [player.isPlaying, player.playFrom, player.playbackId, player]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    audioRef.current.playbackRate = player.speed.value;
  }, [player.speed.value]);

  return (
    <audio
      ref={audioRef}
      src={phrases.audioUrl ?? undefined}
      hidden
      preload="auto"
      onTimeUpdate={() => {
        player.onTimeUpdate(audioRef.current?.currentTime ?? 0);
      }}
    />
  );
});
