# 팬도리 🐼

## 🔧 개발환경 세팅

```bash
$ git clone https://github.com/Ahyoung-Kim/Fandolee.git
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

| 이름   | 역할                    |
| ------ | ----------------------- |
| 윤영인 | 백엔드, 회의록 작성     |
| 김은원 | 백엔드, 위키페이지 관리 |
| 김아영 | 프론트엔드, PM          |

---

### 3/6

1.  프로젝트 주제 결정

- 주제 : 아이돌 중고굿즈 경매 사이트

2.  프로젝트 설명 :

3.  개발환경 설정 :

- Visual Studio Code
- 데이터 베이스 : Firebase
- 개발 언어: React

4.  Github 생성

- https://github.com/Ahyoung-Kim/Fandolee.git

---

### 3/13

1.  프로젝트 환경 및 폴더 구조 세팅

2.  프로젝트 기획안 작성: '아이돌 중고굿즈 경매 웹사이트' 프로젝트를 기획한 이유와 배경 설명

3.  피그마 제작

4.  레이아웃

- 메인 페이지

  <img width="30%" src="https://user-images.githubusercontent.com/92067715/226100071-9eb16e2d-0dd9-400f-8258-fef5fe5cd3f2.png" />

  메인 홈 광고 배너 슬라이더 HomeBanner.jsx

  - react-slick 라이브러리 사용

- 로그인/회원가입 페이지 레이아웃

  <img width="30%" src="https://user-images.githubusercontent.com/92067715/226100436-4cb4f0b1-93bc-45cb-8e55-23740a56ecd3.png"/>

  <img width="30%" src="https://user-images.githubusercontent.com/92067715/226100459-175d75c9-1f6a-4adf-bb2a-4d617d5c3588.png" />


5.  로그인/로그아웃 기능 연동

    Firebase 의 signInWithEmailAndPassword 메소드를 이용해 이메일과 비밀번호로 로그인 기능 연동

    로그인 완료 후 반환 받은 유저 정보를 sessionStroge 에 저장

    sessionStorage에 저장되어 있는 유저 정보를 가져오는 커스텀 훅 useUser 정의

---

### 3/20

1.  SWOT 분석

2.  가격 추천 (머신러닝) 이슈 해결

    판매자가 거래하려는 아이템과 '비슷한 유형의 과거에 거래된 아이템들'의 데이터를 추출하여 최저가와 최고가를 분석한다.

    판매자가 거래 금액 범위를 알맞게 지정할 수 있도록 이 가격을 추천한다.

3.  프로젝트 플로우 작성

4.  데이터 베이스 구상 - product, user, chatroom (투찰 및 거래)

5.  구현

- 회원가입

  createUserWithEmailAndPassword 함수로 이메일과 비밀번호로 계정을 생성하여 파이어베이스 Authentication에 저장

  닉네임과 이름을 추가로 입력받아 파이어베이스 Firestore Database의 ‘users’/’uid’ 문서에 필드 추가

  입력칸이 비어있으면 가입이 되지 않고 setError에 문구를 넣어 경고 문구를 <span>에 띄움

  비밀번호는 8~20자 내로 생성되도록 제한하고, 닉네임과 이메일은 중복 사용이 불가

- 마이페이지 레이아웃 및 데이터 연동
