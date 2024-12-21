export const routes = {
  document: {
    redirect: "/document",
  },
  landing: {
    redirect: "/",
  },
  login: {
    redirect: "/login",
  },
  home: {
    redirect: "/dashboard",
  },
  mint: {
    redirect: "/dashboard/mint",
    children: {
      mintOne: {
        redirect: "/dashboard/mint/one",
      },
      mintMany: {
        redirect: "/dashboard/mint/many",
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
          upload: {
            redirect: "/dashboard/utilities/storage/upload",
          },
        },
      },
      fastCollection: {
        redirect: "/dashboard/utilities/fast-collection",
      },
    },
  },
};