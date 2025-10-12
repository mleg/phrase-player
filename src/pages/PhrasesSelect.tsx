import { PageContainer } from "@/components/common/PageContainer";
import { PhraseRow } from "@/components/player/PhraseRow";
import { Button } from "@/components/ui/button";
import type { Phrase } from "@/stores/phrases-store";
import { useStore } from "@/stores/StoreContext";
import { CircleX } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useHotkeys } from "react-hotkeys-hook";

interface Props {
  className?: string;
}

const renderRow = (phrase: Phrase, i: number) => (
  <PhraseRow key={phrase.id} phrase={phrase} index={i} />
);

export const PhrasesSelect: React.FC<Props> = observer(function PhrasesSelect(
  props
) {
  const { phrases, fileList } = useStore();

  useHotkeys("Esc", phrases.select.hide);

  return (
    <PageContainer className={props.className}>
      <div className="flex gap-2 items-center mb-4">
        <h2 className="text-lg font-bold">{fileList.selectedFileName}</h2>
        <Button
          size="icon-lg"
          variant="ghost"
          className="ml-auto"
          onClick={phrases.select.hide}
        >
          <CircleX className="size-6" />
        </Button>
      </div>

      <div
        className="grid overflow-hidden"
        style={{ gridTemplateColumns: "auto 1fr" }}
      >
        {phrases.list.map(renderRow)}
      </div>
    </PageContainer>
  );
});
