import { GithubLink } from "@/components/common/GithubLink";
import { CircleQuestionMark } from "lucide-react";
import { observer } from "mobx-react-lite";
import type React from "react";
import { Button } from "../ui/button";

export const AppHeader: React.FC = observer(function AppHeader() {
  return (
    <div className="flex items-center justify-center">
      <h1 className="text-xl font-bold text-center">
        Phrase-by-Phrase Audio Player
      </h1>
      <div className="flex items-center justify-center ml-auto gap-1">
        <GithubLink />
        <Button size="icon-sm" variant="ghost" asChild>
          <a
            href="https://github.com/mleg/phrase-player#how-to-use"
            target="_blank"
            rel="noreferrer"
          >
            <CircleQuestionMark className="size-7" />
          </a>
        </Button>
      </div>
    </div>
  );
});
