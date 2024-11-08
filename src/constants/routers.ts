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

export const dashboardRoutes = {
  home: {
    redirect: "/dashboard",
  },
  mint: {
    redirect: "/dashboard/mint",
    children: {
      mintOne: {
        redirect: "/dashboard/mint/one",
      },
      mintMultiple: {
        redirect: "/dashboard/mint/multiple",
      },
    },
  },
  utilities: {
    redirect: "/dashboard/utilities",
    children: {
      collection: {
        redirect: "/dashboard/utilities/collection",
      },
      storage: {
        redirect: "/dashboard/utilities/storage",
        children: {
          uploadFile: {
            redirect: "/dashboard/utilities/storage/upload/one",
          },
          uploadFolder: {
            redirect: "/dashboard/utilities/storage/upload/many",
          },
        },
      },
      fastCollection: {
        redirect: "/dashboard/utilities/fast-collection",
      },
    },
  },
};
