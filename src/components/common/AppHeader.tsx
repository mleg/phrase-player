import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { CircleQuestionMark } from "lucide-react";
import { observer } from "mobx-react-lite";
import type React from "react";
import { useTranslation } from "react-i18next";
import { GithubLink } from "../common/GithubLink";
import { Button } from "../ui/button";

export const AppHeader: React.FC = observer(function AppHeader() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center">
      <h1 className="text-xl font-bold text-center">{t("app.title")}</h1>
      <div className="flex items-center justify-center ml-auto gap-1">
        <GithubLink />
        <Button size="icon-sm" variant="ghost" asChild>
          <a href={t("navigation.links.help")} target="_blank" rel="noreferrer">
            <CircleQuestionMark className="size-7" />
          </a>
        </Button>
        <LanguageSwitcher />
      </div>
    </div>
  );
});
