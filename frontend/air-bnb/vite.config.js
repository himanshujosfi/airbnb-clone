import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
// import { tanstackStart } from '@tanstack/react-start/plugin/vite'

// import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react({
//       babel: {
//         plugins: [['babel-plugin-react-compiler']],
//       },
//     }),
//   ],
// })
