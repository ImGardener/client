# ImGardener🌳

<br/>

## 프로젝트 소개

가드너들을 위한 식물 정보 애플리케이션입니다. 식물들을 검색하고 기록하고 싶은 식물을 북마크할 수 있습니다.
<br/>
<br/>

## 프로젝트 진행기간 및 인원

개인 프로젝트
2022.06~ 2022.06(2주)

<br/>

## 주요 기능

**회원**

회원 관리

1. 회원가입을 통해 회원으로 등록이 가능합니다.
2. 회원가입 정보를 이용해 로그인이 가능합니다.

식물 북마크 기능

1. 식물을 조회 후 원하는 식물을 북마크 할 수 있습니다.
2. 내식물 메뉴를 통해 북마크한 식물들을 조회할 수 있습니다.
3. 버튼을 통해 식물 북마크를 제거할 수 있습니다.

검색기능

1. 식물을 검색하여 식물에 대한 정보를 찾을 수 있습니다.
2. 검색조건을 설정하여 조건을 만족하는 식물을 조회할 수 있습니다.

오늘의 꽃 조회

1. 매일 다른 꽃의 정보를 제공합니다.
   1. 꽃 이름
   2. 꽃 설명

<br/><br/>

## 🔨 Technology Stack

Frontend : React.js, JavaScript(TypeScript로 변경 진행중!), CSS(module-css)

Backend : firebase Realtime Database , Authentication

Database : firebase Realtime Database

# 수정사항

- modal 사용방식 변경(local > context) + useModal 훅 추가 (0706)

  <br/><br/>

# 결함

- ~~환경변수를 ignore 처리하더라도 url에 포함되어 노출되고 있음~~(auth.uid 인증 추가 )
- 자동로그인 시 깜박이는 현상이 있음. 비동기 처리 필요.
- ~~회원가입시 local에 auth정보가 남는현상 처리~~(06.27 )
- ~~검색 리스트 최적화 필요~~
- ~~회원가입 폼 초기화 오류 수정~~(07.08)

  <br/><br/>

## 🤔 Todo

1. 식물 관리 기능 추가
2. ~~node 서버 구축 - cors 대응~~ http middleware proxy로 해결하
3. ~~환경변수 파일 설정~~ hosting시 별도의 환경변수 설정 및 env파일처리로 해결
4. ~~북마크 조회 기능 개선 > 현재 리스트 개선 진행중~~ IntersectionObserver로 개선.
5. 회원 닉네임 등록(회원가입 시 등록)
6. 관리자 기능
7. ~~ useAysnc 훅 만들기 ~~ usehttp hook 추가

<br/><br/>

## 프로젝트 구조

**client**

     └ node_modules

     └ public

     └index.html

     └ src

     └ assets

          └ component

          └ pages

          └ stores

          └ styles

          └ utils

          └ hook

     └ index.js

     └ app.js

     └ setupProxy.js

     └ packeage.json
