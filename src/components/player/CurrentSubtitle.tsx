import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { useStore } from "@/stores/StoreContext";
import { Check, Copy } from "lucide-react";
import { observer } from "mobx-react-lite";
import type React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export const CurrentSubtitle: React.FC = observer(function CurrentSubtitle() {
  const { phrases } = useStore();
  const { t } = useTranslation();
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 1000 });

  return (
    <Card className="p-4">
      <div
        className={cn(
          "font-mono whitespace-pre-line leading-[1.5] min-h-[6em]"
        )}
      >
        {phrases.currentPhrase?.text}
      </div>
      <div className="flex justify-between items-center mt-1">
        <div
          className={cn(
            "text-sm italic mt-1",
            phrases.list.length === 0 && "invisible"
          )}
        >
          {t("navigation.phrase_counter", {
            current: phrases.currentIndex + 1,
            total: phrases.list.length,
          })}
        </div>
        <Button
          variant="secondary"
          disabled={!phrases.currentPhrase}
          size="sm"
          className="h-8 shadow-none"
          onClick={() => copyToClipboard(phrases.currentPhrase?.text ?? "")}
        >
          {isCopied ? <Check /> : <Copy />}
          {t("controls.copy")}
        </Button>
      </div>
    </Card>
  );
});
