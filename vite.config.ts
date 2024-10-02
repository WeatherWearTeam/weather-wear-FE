import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { createHtmlPlugin } from "vite-plugin-html";

// interface configProps {
//   mode: string;
// }

export default () => {
  //{ mode }: configProps
  // const env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      react(),
      svgr(),
      createHtmlPlugin({
        minify: true,
        // inject: {
        //   data: {
        //     kakaoApiKey: env.VITE_KAKAO_APP_KEY,
        //   },
        // },
      }),
    ],
    resolve: {
      alias: [
        { find: "@components", replacement: "/src/components" },
        { find: "@pages", replacement: "/src/pages" },
        { find: "@shared", replacement: "/src/shared" },
        { find: "@api", replacement: "/src/api" },
        { find: "@queries", replacement: "/src/queries" },
        { find: "@styles", replacement: "/src/styles" },
        { find: "@hooks", replacement: "/src/hooks" },
        { find: "@assets", replacement: "/src/assets" },
        { find: "@utils", replacement: "/src/utils" },
        { find: "@store", replacement: "/src/store" },
        { find: "@types", replacement: "/src/types" },
        { find: "@", replacement: "/src" },
      ],
    },
    // server: {
    //   proxy: {
    //     "/api": {
    //       target: env.VITE_SERVER_URL_PRODUCTION,
    //       changeOrigin: true, // 요청 헤더 host 필드 값을 대상 서버의 호스트 이름으로 변경
    //       secure: false, // SSL 인증서 검증 무시
    //       rewrite: (path) => path.replace(/^\/api/, ""),
    //     },
    //   },
    // },
  });
};
