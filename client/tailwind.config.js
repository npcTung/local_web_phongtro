/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "public/index.html"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#F5F5F5",
        "overlay-30": "rgba(0,0,0,0.3)",
        "overlay-70": "rgba(0,0,0,0.7)",
      },
      backgroundImage: {
        linearGradient: "linear-gradient(145deg,#0039e4 0,#04dbf1 100%)",
      },
      maxWidth: {
        "1100px": "1100px",
      },
      minWidth: {
        "200px": "200px",
      },
      width: {
        "1100px": "1100px",
      },
      colors: {
        "#F5F5F5": "#F5F5F5",
        "#1266DD": "#1266DD",
        "#F73859": "#F73859",
        "#f60": "#f60",
      },
      padding: {
        "10px": "10px",
      },
      flex: {
        3: "3 3 0%",
      },
    },
  },
  plugins: [require("daisyui")],
};
