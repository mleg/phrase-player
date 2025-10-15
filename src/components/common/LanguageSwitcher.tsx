import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

const findLang = (lang: string) =>
  languages.find((item) => item.code === lang) ?? languages[0];

export const LanguageSwitcher: React.FC = observer(function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(findLang(i18n.language));

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLang(findLang(lng));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="relative">
          <Globe className="size-7" />
          <span
            role="img"
            aria-label="language"
            className="text-lg absolute right-0 left-0 -bottom-6"
          >
            {lang.flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className="flex items-center gap-2"
          >
            <span className="text-base" role="img" aria-label={language.name}>
              {language.flag}
            </span>
            <span>{language.name}</span>
            {i18n.language === language.code && (
              <span className="ml-auto text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
