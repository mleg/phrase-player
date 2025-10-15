import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { type AfterPhraseAction, afterPhraseEnum } from "@/stores/player";
import { useStore } from "@/stores/StoreContext";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

interface Props {
  className?: string;
}

export const AfterPhraseMode: React.FC<Props> = observer(
  function AfterPhraseMode(props) {
    const { player } = useStore();
    const { t } = useTranslation();

    const getModeTitle = (mode: AfterPhraseAction): string => {
      switch (mode) {
        case afterPhraseEnum.STOP:
          return t("player.modes.stop");
        case afterPhraseEnum.REPEAT:
          return t("player.modes.repeat");
        case afterPhraseEnum.CONTINUE:
          return t("player.modes.continue");
        default:
          return mode;
      }
    };

    return (
      <div
        className={cn(
          "flex flex-wrap gap-x-4 gap-y-2 items-center",
          props.className
        )}
      >
        <label htmlFor="mode-select" className="whitespace-nowrap">
          {t("player.after_phrase")}
        </label>
        <Tabs
          value={player.mode}
          id="mode-select"
          onValueChange={player.setMode}
        >
          <TabsList>
            {Object.keys(afterPhraseEnum).map((key) => (
              <TabsTrigger key={key} value={key}>
                {getModeTitle(key as AfterPhraseAction)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    );
  }
);
