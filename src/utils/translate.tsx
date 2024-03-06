const chineseConv = require("chinese-conv");

export const ChinesTranslate = (txt: string, i18n: any) => {
  // const { i18n } = useTranslation();
  const currentLang = i18n.language;
  if (currentLang === "tc") return chineseConv.tify(txt);
  if (currentLang === "sc") return chineseConv.sify(txt);
  return txt;
};
