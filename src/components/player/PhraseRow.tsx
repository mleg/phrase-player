import { cn } from "@/lib/utils";
import type { Phrase } from "@/stores/phrases-store";
import { useStore } from "@/stores/StoreContext";
import { observer } from "mobx-react-lite";
import css from "./PhraseRow.module.css";

interface Props {
  phrase: Phrase;
  index: number;
}

export const PhraseRow: React.FC<Props> = observer(function PhraseRow({
  phrase,
  index,
}) {
  const { phrases } = useStore();
  const isActive = phrases.currentIndex === index;

  const selectPhrase = () => phrases.selectPhrase(index);

  return (
    <div
      className={cn("contents cursor-pointer", css.row)}
      onClick={selectPhrase}
    >
      <div
        className={cn("text-right border-b py-2 relative", css.firstCell)}
        data-active={isActive || undefined}
      >
        {index + 1}
      </div>
      <div className={cn("pl-4 border-b py-2")}>{phrase.text}</div>
    </div>
  );
});
