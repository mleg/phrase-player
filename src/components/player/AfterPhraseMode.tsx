import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  afterPhraseEnum,
  afterPhraseTitles,
  type AfterPhraseAction,
} from "@/stores/player";
import { useStore } from "@/stores/StoreContext";
import { observer } from "mobx-react-lite";

export const AfterPhraseMode: React.FC = observer(function AfterPhraseMode() {
  const { player } = useStore();
  return (
    <div className="flex gap-4 items-center">
      <label htmlFor="mode-select">After phrase:</label>
      <Tabs value={player.mode} id="mode-select" onValueChange={player.setMode}>
        <TabsList>
          {Object.keys(afterPhraseEnum).map((key) => (
            <TabsTrigger key={key} value={key}>
              {afterPhraseTitles[key as AfterPhraseAction]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
});
