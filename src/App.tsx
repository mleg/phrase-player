import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { PhraseAudioPlayer } from "./pages/PhraseAudioPlayer";
import { PhrasesSelect } from "./pages/PhrasesSelect";
import { useStore } from "./stores/StoreContext";

export const App: React.FC = observer(function AppLayout() {
  useTranslation();
  const { phrases } = useStore();

  return (
    <>
      <PhraseAudioPlayer
        className={phrases.select.visible ? "hidden" : undefined}
      />
      <PhrasesSelect
        className={phrases.select.visible ? undefined : "hidden"}
      />
    </>
  );
});
