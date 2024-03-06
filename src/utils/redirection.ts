import { history } from "src/stores";

export const redirect = (url: string | null, type = "_blank") => {
  if (!url) return;
  return window.open(url, type);
};

export const goToPage = (page: string) => {
  if (!page) return;
  return history.push(page);
};
