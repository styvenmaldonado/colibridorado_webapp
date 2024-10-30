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
  runtimeConfig: {
    s3_accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    s3_secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
    baseURL: process.env.BASE_URL || "",
    WOMPI_API_KEY: process.env.WOMPI_API_KEY || "",
    public: {
      cdn: process.env.CND,
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: true, // whether to hit the /auth/session endpoint on every client request
      },
    },
  },
});
