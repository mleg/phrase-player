import { observer } from "mobx-react-lite";
import React from "react";
import { useEffectOnce } from "react-use";

import { PageContainer } from "@/components/common/PageContainer";
import { Audio } from "@/components/player/Audio";
import { AudioButtons } from "@/components/player/AudioButtons";
import { AudioSelect } from "@/components/player/AudioSelect";
import { CurrentSubtitle } from "@/components/player/CurrentSubtitle";
import { FolderSelect } from "@/components/player/FolderSelect";
import { cn } from "@/lib/utils";
import { useStore } from "@/stores/StoreContext";
import { AfterPhraseMode } from "../components/player/AfterPhraseMode";
import { EVENTS } from "../stores/event-bus";

interface Props {
  className?: string;
}

export const PhraseAudioPlayer: React.FC<Props> = observer(
  function PhraseAudioPlayer(props) {
    const { eventbus } = useStore();

    useEffectOnce(() => eventbus.emit(EVENTS.appStart));

    return (
      <PageContainer className={cn("flex flex-col gap-4", props.className)}>
        <h1 className="text-xl font-bold text-center">
          Phrase-by-Phrase Audio Player
        </h1>

        <FolderSelect />

        <AudioSelect />

        <AfterPhraseMode />

        <AudioButtons />

        <CurrentSubtitle />

        <Audio />
      </PageContainer>
    );
  }
);
