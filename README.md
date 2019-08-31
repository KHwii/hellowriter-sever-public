# Upstream - Server 설정중입니다

- 기본적으로 사용 할 eslint 및 prettier 설정 예정입니다
- git flow에 대한 이해는 승재님의 영상 참고하면 될 것 같습니다
- 문제 있는 부분은 바로 논의 진행 예정입니다

- 코드 규칙 통일을 위해 VS Code Extension 내 ESLint 및 Prettier 설치가 필요합니다
- 이후 settings(Cmd+) 진입, 우측 상단의 '{}' 버튼을 눌러 json 파일을 오픈합니다
- 아래 설정 내용을 추가합니다

  {
  ...,
  "editor.formatOnSave": true,
  "javascript.format.enable": false,
  "prettier.eslintIntegration": true
  }
