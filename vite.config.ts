import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { createHtmlPlugin } from "vite-plugin-html";

interface configProps {
  mode: string;
  //import.meta.env.MODE: {string} the mode the app is running in.
  //https://vitejs.dev/config/#conditional-config
  //https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes
}

// https://vitejs.dev/config/
export default ({ mode }: configProps) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      react(),
      svgr(),
      //html 환경변수 사용 설정
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            kakaoApiKey: env.VITE_KAKAO_APP_KEY,
          },
        },
      }),
      //
    ],
    //개발 모드에서만 작동함
    //서버 proxy 설정
    server: {
      proxy: {
        "/api": {
          target: env.VITE_SERVER_URL_PRODUCTION, //요청 전달 대상 서버 주소 설정
          changeOrigin: true, // 요청 헤더 host 필드 값을 대상 서버의 호스트 이름으로 변경
          secure: false, // SSL 인증서 검증 무시
        },
      },
    },

    //절대경로 설정
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
        { find: "@", replacement: "/src" },
      ],
    },
  });
};
