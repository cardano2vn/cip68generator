const router = {
  landing: "/",
  about: "/about",
  faq: "/faq",
  mint: "/mint",
  document: "/document",
} as const;

export default router;

export const publicRoutes = [
  { name: "Home", redirect: router.landing },
  { name: "Mint", redirect: router.mint },
  { name: "Document", redirect: router.document },
  { name: "About", redirect: router.about },
  { name: "Faq", redirect: router.faq },
];
