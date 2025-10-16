import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

const isSameLang = (code1: string, code2: string) => {
  const codeLower1 = code1.toLowerCase();
  const codeLower2 = code2.toLowerCase();
  return (
    codeLower1 === codeLower2 ||
    codeLower1.startsWith(`${codeLower2}-`) ||
    codeLower2.startsWith(`${codeLower1}-`)
  );
};

const findLang = (lang: string) =>
  languages.find((item) => isSameLang(lang, item.code)) ?? languages[0];

export function LanguageSwitcher() {
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
            {isSameLang(language.code, i18n.language) && (
              <span className="ml-auto text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
