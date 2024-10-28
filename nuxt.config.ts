// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    renderJsonPayloads: false,
  },
  ssr: false,
  compatibilityDate: "2024-04-03",
  modules: [
    "@nuxtjs/tailwindcss",
    "vuetify-nuxt-module",
    "@hebilicious/authjs-nuxt",
  ],
  // devtools: { enabled: true },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  alias: {
    cookie: "cookie",
  },
    // Optional default config
   authJs: {
  //    verifyClientOnEveryRequest: true,
  //    guestRedirectTo: "/", // where to redirect if the user is not authenticated
  //    authenticatedRedirectTo: "/", // where to redirect if the user is authenticated
  baseUrl: process.env.BASE_URL // should be something like https://www.my-app.com
  },
  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET, // You can generate one with `openssl rand -base64 32`
    },
    public: {
      cdn: process.env.CND,
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: true, // whether to hit the /auth/session endpoint on every client request
      },
    },
  },
});
