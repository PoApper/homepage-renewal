const navBarLinks = [
  { name: "Home", url: "/" },
  { name: "People", url: "/people" },
  { name: "Seminar", url: "/seminar" },
  { name: "Blog", url: "/blog" },
];

const footerLinks = [
  {
    section: "Sites",
    links: [
      { name: "Github", url: "https://github.com/PoApper" },
      { name: "Facebook", url: "https://www.facebook.com/poapper.club" },
    ],
  },
  {
    section: "Service",
    links: [{ name: "POPO", url: "https://popo.poapper.club/" }],
  },
  {
    section: "Contact/Address",
    links: [
      { name: "Gmail", url: "poapper@gmail.com" },
      {
        name: "포항시 남구 청암로 77 학생회관 211호",
        url: "https://www.postech.ac.kr",
      },
    ],
  },
];

export default {
  navBarLinks,
  footerLinks,
};
