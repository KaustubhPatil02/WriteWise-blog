/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black1: "rgba(0,0,0,0.8)",
        banner: "rgb(255, 192, 23)",
      post1: "#111827",
        header1:"#334155",
        header2:"#0f172a",
        write:"#475569"
      },
      fontFamily: {
        title: `gt-super, Georgia, Cambria,Times New Roman, Times, serif;`,
        texts: `sohne, Helvetica Neue, Helvetica, Arial, sans-serif`,
      },
      gridTemplateColumns: {
        card: "repeat(auto-fit, minmax(280px, 1fr))",
      },
    },
  },
  plugins: [],
};