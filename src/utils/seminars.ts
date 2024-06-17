const seminars = [
  {
    name: "Front-end",
    url: "#",
    images: [
      "/public/seminar/html.png",
      "/public/seminar/css.png",
      "/public/seminar/react.png",
    ],
  },
  {
    name: "Back-end",
    url: "https://github.com/PoApper/backend-seminar",
    images: ["/public/seminar/nodejs.png", "/public/seminar/mysql.png"],
  },
  {
    name: "Mobile",
    url: "https://github.com/PoApper/flutter_seminar",
    images: ["/public/seminar/dart.png", "/public/seminar/flutter.png"],
  },
  {
    name: "NestJs",
    url: "https://github.com/PoApper/nestjs-seminar",
    images: ["/public/seminar/nestjs.png", "/public/seminar/jest.png"],
  },
  {
    name: "PyTorch",
    url: "https://github.com/PoApper/pytorch-seminar",
    images: ["/public/seminar/pytorch.png"],
  },
];

const irregular_seminars = [
  {
    name: [["하석윤", "BlueHorn07"]],
    title: "웰컴 세미나 - 1",
    date: "2021-03-16",
    pdfUrl: "https://drive.google.com/file/d/1MvZ7pcnAJZl0cajDSNK-7ZAkNnFgd59G/view?usp=drive_link",
    description: "git, GitHub, VS Code 등등!"
  },
  {
    name: [["하석윤", "BlueHorn07"]],
    title: "웰컴 세미나 - 2",
    date: "2021-03-30",
    pdfUrl: "https://drive.google.com/file/d/1cwXqu6ujLVGI4ujsmts0zMJm1SNh6YnV/view?usp=drive_link",
    description: "JetBrain Family, Markdown!"
  },
  {
    name: [["하석윤", "BlueHorn07"]],
    title: "웰컴 세미나 - 3",
    date: "2021-04-16",
    pdfUrl: "https://drive.google.com/file/d/1qXPfH7T7lj5vFQe3oKKzz3DIMB9GJnIu/view?usp=drive_link",
    description: "코딩 테스트 입문!!"
  },
  {
    name: [["제태호", "stpcoder"]],
    title: "인턴경험과 생활에 관해",
    date: "2021-11-29",
    pdfUrl: "https://drive.google.com/file/d/1H1ibR5kiIoUsATQl8ZM84LZ9vN_LRDHf/view?usp=drive_link",
    description: "미리디 인턴 경험을 바탕으로"
  },
  {
    name: [["하석윤", "BlueHorn07"]],
    title: "Gaussian Process Regression",
    date: "2021-12-13",
    pdfUrl: "https://drive.google.com/file/d/1PCPUPeg9wIB8G9lKBzI9pMNmhxrpzeDQ/view?usp=drive_link",
    description: "GPR and Anomaly Detection"
  },
  {
    name: [["하석윤", "BlueHorn07"]],
    title: "개발자의 글쓰기와 지킬 블로그",
    date: "2022-03-14",
    pdfUrl: "https://drive.google.com/file/d/1b-4a5Ol0BEjn2pkIu0X7Uhg6jtnbCFmL/view?usp=drive_link",
    description: "개발자의 블로그 운영"
  },
  {
    name: [["김준서", ""], ["이채린", ""]],
    title: "포애퍼 테기 세미나",
    date: "2022-03-21",
    pdfUrl: "https://drive.google.com/file/d/13ANBaqtmvyBUWFi-OF-pPIbgIZzZ7HBc/view",
    description: "프밍만 배운 포스테키안의 웹게임 개발 박치기"
  },
  {
    name: [["손량", "sohnryang"]],
    title: "메모리 안전 언어 Rust",
    date: "2022-04-18",
    pdfUrl: "https://drive.google.com/file/d/1yfcTX5bCUM1DcL37zSl73fNrvIVmL7UB/view?usp=drive_link",
    description: "메모리 안전 언어 Rust 알아보기"
  },
  {
    name: [["박원빈", "Park-Wonbin"]],
    title: "Git 세미나",
    date: "2022-05-02",
    pdfUrl: "https://drive.google.com/file/d/1sAo_aDhyNZVNj-EkRZfwXzOJiqdzAbcG/view",
    description: "완전 초보자를 위한 버전 관리"
  },
  {
    name: [["하석윤", "BlueHorn07"]],
    title: "학부생의 AWS Certificate 도전기",
    date: "2022-11-07",
    pdfUrl: "https://drive.google.com/file/d/1MjI3ai740AsSM07VsWrIm7fJmtlianLM/view?usp=drive_link",
    description: "학부생의 AWS Certificate 도전기"
  }
]

export default {
  seminars,
  irregular_seminars
};
