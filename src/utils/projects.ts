const projects = [
  {
    name: "POPO",
    description:
      "포포 (POPO, POstechian's POrtal) 는 포스텍 총학생회의 장비/장소를 예약할 수 있는 편의 서비스입니다. 포스텍 총학생회에서 운영을 포애퍼가 개발 및 유지/보수를 진행하고 있습니다. 학교 공용 시설을 손쉽게 예약하고, 교내 학생단체와 동아리 정보 등을 확인할 수 있습니다.",
    imageUrl:
      "https://raw.githubusercontent.com/PoApper/POPO-nest-api/master/assets/popo.svg",
  },
  {
    name: "Inpostack",
    description:
      "인포스택 (InPoStack) 은 포스텍 인근의 배달 음식점에 대한 정보를 제공하는 서비스 입니다. 학생들은 쉽고 간편하게 학교 주변 맛집 정보를 검색할 수 있습니다.",
    imageUrl:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkYXRhLW5hbWU9IuugiOydtOyWtCA1Ij4KCiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPHBvbHlnb24gaWQ9InN2Z18xIiBmaWxsPSIjMDA1ZDgwIiBwb2ludHM9IjExMy43NTU5OTY3MDQxMDE1NiwyODAgODQsMjY2LjU2Nzk5MzE2NDA2MjUgODQsMjI3LjI0Njk5NDAxODU1NDcgMTEzLjc1NTk5NjcwNDEwMTU2LDI0MC42NzkwMDA4NTQ0OTIyIDExMy43NTU5OTY3MDQxMDE1NiwyODAgIiBjbGFzcz0iY2xzLTEiLz4KICA8cG9seWdvbiBpZD0ic3ZnXzIiIGZpbGw9IiMwMDc1OGUiIHBvaW50cz0iMTEzLjc1NTk5NjcwNDEwMTU2LDIzNC41NjEwMDQ2Mzg2NzE4OCA4NCwyMjEuMTI4OTk3ODAyNzM0MzggODQsMTgxLjgwNzk5ODY1NzIyNjU2IDExMy43NTU5OTY3MDQxMDE1NiwxOTUuMjQwOTk3MzE0NDUzMTIgMTEzLjc1NTk5NjcwNDEwMTU2LDIzNC41NjEwMDQ2Mzg2NzE4OCAiIGNsYXNzPSJjbHMtMiIvPgogIDxwb2x5Z29uIGlkPSJzdmdfMyIgZmlsbD0iI2I4MWY1NCIgcG9pbnRzPSIyMzAuNTgyMDAwNzMyNDIxODgsODMuMTEwMDAwNjEwMzUxNTYgMTkyLjkxMDAwMzY2MjEwOTM4LDY2LjMyMDk5OTE0NTUwNzgxIDE5Mi45MTAwMDM2NjIxMDkzOCwyNyAyMzAuNTgyMDAwNzMyNDIxODgsNDMuNzg4OTk3NjUwMTQ2NDg0IDIzMC41ODIwMDA3MzI0MjE4OCw4My4xMTAwMDA2MTAzNTE1NiAiIGNsYXNzPSJjbHMtMyIvPgogIDxwb2x5Z29uIGlkPSJzdmdfNCIgZmlsbD0iIzcxM2E2MyIgcG9pbnRzPSIxMTMuNzU1OTk2NzA0MTAxNTYsMTg5LjEyMzAwMTA5ODYzMjggODQsMTc1LjY5MDAwMjQ0MTQwNjI1IDg0LDEyMi4zNDIwMDI4Njg2NTIzNCAxMTMuNzU1OTk2NzA0MTAxNTYsMTM1Ljc3NDk5Mzg5NjQ4NDM4IDExMy43NTU5OTY3MDQxMDE1NiwxODkuMTIzMDAxMDk4NjMyOCAiIGNsYXNzPSJjbHMtNCIvPgogIDxwb2x5bGluZSBpZD0ic3ZnXzUiIGZpbGw9IiMwMjNmNjQiIHBvaW50cz0iMTEzLjc1NTk5NjcwNDEwMTU2LDI4MCAxNDMuNTExOTkzNDA4MjAzMTIsMjY2LjU2Nzk5MzE2NDA2MjUgMTQzLjUxMTk5MzQwODIwMzEyLDIyNy4yNDY5OTQwMTg1NTQ3IDExMy43NTU5OTY3MDQxMDE1NiwyNDAuNjc5MDAwODU0NDkyMiAiIGNsYXNzPSJjbHMtNSIvPgogIDxwb2x5bGluZSBpZD0ic3ZnXzYiIGZpbGw9IiMwMDVkNzMiIHBvaW50cz0iMTEzLjc1NTk5NjcwNDEwMTU2LDIzNC41NjEwMDQ2Mzg2NzE4OCAyMzAuNTgyMDAwNzMyNDIxODgsMTgxLjg1MjAwNTAwNDg4MjggMjMwLjU4MjAwMDczMjQyMTg4LDE0Mi41MzE5OTc2ODA2NjQwNiAxMTMuNzU1OTk2NzA0MTAxNTYsMTk1LjI0MDk5NzMxNDQ1MzEyICIgY2xhc3M9ImNscy02Ii8+CiAgPHBvbHlsaW5lIGlkPSJzdmdfNyIgZmlsbD0iIzkyMTA0MSIgcG9pbnRzPSI4NCwxMTUuNTIzMDAyNjI0NTExNzIgMTkyLjkxMDAwMzY2MjEwOTM4LDY2LjMyMDk5OTE0NTUwNzgxIDE5Mi45MTAwMDM2NjIxMDkzOCwyNyA4NCw3Ni4yMDE5OTU4NDk2MDkzOCAiIGNsYXNzPSJjbHMtNyIvPgogIDxwb2x5bGluZSBpZD0ic3ZnXzgiIGZpbGw9IiNkYTE0NTEiIHBvaW50cz0iODQsNzYuMjAxOTk1ODQ5NjA5MzggMjMwLjU4MjAwMDczMjQyMTg4LDE0Mi41MzE5OTc2ODA2NjQwNiAyMzAuNTgyMDAwNzMyNDIxODgsMTgxLjg1MjAwNTAwNDg4MjggODQsMTE1LjUyMzAwMjYyNDUxMTcyICIgY2xhc3M9ImNscy04Ii8+CiA8L2c+Cjwvc3ZnPg==",
  },
];

export default {
  projects,
};
