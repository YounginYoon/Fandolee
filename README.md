# 팬도리


## 🔧 개발환경 세팅

```bash
$ git clone https://github.com/Ahyoung-Kim/DDJT
$ cd DDJT
$ npm install
```

## 💚 실행 명령어

```bash
$ npm run start
또는
$ npm start
```

---

## 👩‍🔧 팀원 소개
|이름|역할|
|------|---|
|윤영인|프로젝트 관리, 백엔드|
|김은원|백엔드|
|김아영|프론트엔드|

---

### 3/6

1. 프로젝트 주제 결정

- 주제 : 아이돌 중고굿즈 경매 사이트

2. 프로젝트 설명 :

3. 개발환경 설정 :

- Visual Studio Code
- 데이터 베이스 : Firebase
- 개발 언어: React

4. Github 생성

- https://github.com/Ahyoung-Kim/DDJT.git

---

### 3/13

- 윤영인:

 1. 피그마 제작

  + 메인: 
   
    <img width="80%" src="https://user-images.githubusercontent.com/92067715/226099330-1a7bc648-17d8-42bc-b674-cd6e23dd4a99.png"/>
    
    광고창 및 사용자에게 추천할 상품 목록 디자인

    우측 상단엔 밤부 점수가 높은 사용자의 랭킹을 표시
   
  + 로그인 / 회원가입:

    <img width="80%" src="https://user-images.githubusercontent.com/92067715/226099415-87c100ea-325b-4eca-9f76-d72b6cff6a56.png"/>
    
    회원가입 시 비밀번호와 이메일로 유저를 생성하고, 이름과 닉네임을 추가 정보로 넣어줌.
    
    <img width="80%" src="https://user-images.githubusercontent.com/92067715/226099440-53c40c91-bf70-4c09-bcc0-25270dbad767.png" />
   
    로그인은 이메일과 비밀번호로 진행
   
  + 프로필: 

    <img width="80%" src="https://user-images.githubusercontent.com/92067715/226099494-39e77633-871e-4127-89ac-4712d89f0d9e.png"/>
    
     거래 완료 후 소비자로부터 받은 평점 통계인 '밤부 점수'를 그래프로 표시

     해당 사용자가 완료한 거래 내역 표시
    
  + 게시글 포스팅:
   
    <img width="80%" src="https://user-images.githubusercontent.com/92067715/226099547-3a7bb971-b001-4f31-aecb-f34ac439b845.png"/>
  
  + 게시글 목록:

     <img width="80%" src="https://user-images.githubusercontent.com/92067715/226099651-1fa7a657-45b2-4074-a758-514e1fd5694b.png" />
    
     아이돌의 이름과 굿즈 종류로 검색을 진행하여 관련 게시글을 띄움
     



- 김은원:

 1. 프로젝트 기획안 작성: '아이돌 중고굿즈 경매 웹사이트' 프로젝트를 기획한 이유와 배경 설명
  
 2. 피그마 제작

  + 게시글 상세 페이지: 

    <img width="80%" src="https://user-images.githubusercontent.com/92067715/226099733-11be94ec-1d99-4d6d-a2dc-2aef2e0ef80d.png" />
    
    게시글 제목은 아이돌 이름(영문은 영문으로 기입) + 앨범 제목으로 통일
    
    가격이 가장 중요하기 때문에 가격 표시를 가장 크게 표시
    
    부제목엔 상세 정보, 상품 정보에는 배송과 하자 정보 표시
    
    또한 판매자의 점수와 리뷰 표시
    
  + 게시글 채팅 페이지:
    
    <img width="80%" src="https://user-images.githubusercontent.com/92067715/226099775-e84eff41-2850-4665-b367-dc7cee1605cc.png" />
    
    '경매 시작' 버튼을 클릭하면 보이는 페이지
    
    제목과 부제은 왼쪽 상단, 판매자 정보는 우측 상단에 표시
    
    상품 정보는 경매 채팅 왼쪽에 표시
    
    팬봇 추천 가격은 AI로 이전 데이터를 분석하여 채택 가능성이 높은 가격 제시
    
    채팅 시 상대의 정보는 보이지 않고 날짜와 시간 표시
    
    
    
    
- 김아영:

 1. 프로젝트 환경 및 폴더 구조 세팅

 2. 헤더, 네비바, 푸터 레이아웃

 3. 로그인/로그아웃 기능 연동

    Firebase 의 signInWithEmailAndPassword 메소드를 이용해 이메일과 비밀번호로 로그인 기능 연동
   
    로그인 완료 후 반환 받은 유저 정보를 sessionStroge 에 저장
   
    sessionStorage에 저장되어 있는 유저 정보를 가져오는 커스텀 훅 useUser 정의
   
 4. 메인 페이지 레이아웃

    <img width="80%" src="https://user-images.githubusercontent.com/92067715/226100071-9eb16e2d-0dd9-400f-8258-fef5fe5cd3f2.png" />
    
    메인 홈 광고 배너 슬라이더 HomeBanner.jsx
     - react-slick 라이브러리 사용

 5. 로그인/회원가입 페이지 레이아웃

    <img width="80%" src="https://user-images.githubusercontent.com/92067715/226100436-4cb4f0b1-93bc-45cb-8e55-23740a56ecd3.png"/>
    
    <img width="80%" src="https://user-images.githubusercontent.com/92067715/226100459-175d75c9-1f6a-4adf-bb2a-4d617d5c3588.png" />
    
    
    
