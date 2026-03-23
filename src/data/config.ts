const config = {
  title: "Ankit | Portfolio",
  description: {
    long: "Explore the portfolio of Ankit, a passionate developer with experience in Development, DevOps & Database management. Strong analytical skills, effective communication, and a team-oriented approach to driving process improvements and delivering results.",
    short:
      "Discover the portfolio of Ankit, a passionate developer solving real-life problems.",
  },
  keywords: [
    "Ankit",
    "Ankit portfolio",
    "portfolio",
    "DevOps",
    "Development",
    "Database",
    "creative technologist",
    "web development",
    "interactive websites",
    "AWS",
    "DevSecOps",
    "AIOps",
    "Azure",
  ],
  author: "Ankit",
  email: "",
  site: "",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    x: "https://x.com/AnkitYadav67393",
    linkedin: "https://www.linkedin.com/in/ankit-kumar098/",
    github: "https://github.com/ankitydv098",
  },
};
export { config };
