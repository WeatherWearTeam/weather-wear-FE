# Weather Wear
<p align="center">
   <img src="https://github.com/user-attachments/assets/b08e0a01-a55e-4981-ac4e-753b9a9f3488" alt="weather_wear_logo" width="150px">
   <br/>
   <br/>
   <a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FWeatherWearTeam%2Fweather-wear-FE&count_bg=%233D7DFF&title_bg=%23333333&icon=&icon_color=%23E7E7E7&title=%F0%9F%91%80+%EC%A1%B0%ED%9A%8C%EC%88%98&edge_flat=false"/></a>
</p>

<br />

## 목차
  - [개요](#개요)
  - [팀원 소개](#팀원-소개)
  - [프로젝트 소개](#프로젝트-소개)
  - [시작 가이드](#시작-가이드)
  - [아키텍처 및 유저 플로우](#아키텍처-및-유저-플로우)
  - [사용한 기술](#사용한-기술)
  - [화면 구성](#화면-구성)
  - [주요 기능](#주요-기능)
  - [트러블 슈팅](#트러블-슈팅)
  - [프론트엔드팀의 프로젝트 목표 및 노력](#프론트엔드팀의-프로젝트-목표-및-노력)
  - [성능 측정 및 개선](#성능-측정-및-개선)

<br />

## 개요
- 프로젝트 이름: 웨더웨어(Weather Wear)
- 프로젝트 기간: 2024.07.26-08.16 (4주)
- FE 개발 언어: React + TypeScript
- FE 멤버: 정은화, 고근우

<br />

## 팀원 소개

|FE 팀장: 정은화|FE 팀원: 고근우|
|:--:|:--:|
|<img src="https://github.com/user-attachments/assets/290ab63a-9a4a-4c2e-a25b-5d218f23520d" width="120px" height="120px" alt="이미지"/>|<img src="https://github.com/user-attachments/assets/587b2993-53f4-4e58-ad35-1681b9dc19b9" width="120px" height="120px" alt="이미지"/>|
|<a href="https://github.com/summereuna">@summereuna</a>|<a href="https://github.com/GoGeunWoo">@GoGeunWoo</a>|
|`summereuna@gmail.com`|`gkw0314@naver.com`|

<br />

## 프로젝트 소개
### 패션과 날씨,이제 웨더웨어에서 한 번에!
웨더웨어는 날씨를 기반으로 개인 맞춤형 옷차림 추천 서비스를 제공하는 패션 커뮤니티입니다.
<br/>
사용자들과 함께 OOTD(outfit of the day, 오늘의 옷차림) 패션 스타일을 공유하고,
<br/>
오늘의 날씨에 딱 맞는 나만의 특별한 OOTD로 스타일리시하게 하루를 시작해보세요!
<p align="center">
   <img src="https://github.com/user-attachments/assets/46b35357-d7ec-4417-ae66-ccedbb9c73ee" alt="weather_wear_1" width="45%">
   <img src="https://github.com/user-attachments/assets/04175461-164f-44fd-b5a8-96429a9e1752" alt="weather_wear_2" width="45%">
</p>


<br/>

### 프로젝트 시작 배경
실제로 외출 전, 항상 날씨와 기온을 체크한 후 기온별 옷차림 이미지의 내용을 참고하여 옷차림을 신경쓰던 한 팀원! 
<br/>대구에 사는 이 팀원은 콘서트를 보러 서울에 갈 때에도, 서울의 현재 날씨와 기온은 어떻고 요즘 날씨에 따라 서울에서는 어떤 착장으로 옷을 입는지 궁금하여 인스타나 커뮤니티에 OOTD를 검색해왔고, 날씨에 따라 자동으로 기온별 옷차림을 알려주면 좋겠다는 생각을 했습니다.
<br/>날씨 및 기온별 옷차림에 대한 추천 서비스가 확장 가능성이 있어 보였고, 팀원들과의 논의 후 살을 더 붙이는 방식으로 이 아이디어를 선택하게 되었습니다.

<br />

## 시작 가이드
### Requirements
For building and running the application you need:

- Node.js (latest LTS version recommended)
- Yarn ^v.1.22.22 (latest stable version recommended)

### Installation
```bash
$ git clone https://github.com/WeatherWearTeam/weather-wear-FE.git
$ cd weather-wear-FE
```

#### Frontend
```bash
$ cd weather-wear-FE
$ yarn install
$ yarn dev
```

<br />

## 아키텍처 및 유저 플로우
### 아키텍처
![ServiceArchitecture](https://github.com/user-attachments/assets/97584731-a629-402a-9ed8-e9c46c99d57d)

#### FE 디렉토리 구조
```
📦src
 ┣ 📂api
 ┣ 📂assets
 ┃ ┣ 📂icons
 ┃ ┗ 📂images
 ┣ 📂components
 ┃ ┣ 📂Board
 ┃ ┣ 📂Closet
 ┃ ┣ 📂Color
 ┃ ┣ 📂Comment
 ┃ ┣ 📂Home
 ┃ ┃ ┣ 📂NaverShop
 ┃ ┃ ┣ 📂Ootd
 ┃ ┃ ┗ 📂Weather
 ┃ ┃   ┗ 📂WeatherBackground
 ┃ ┣ 📂Modal
 ┃ ┣ 📂Select
 ┃ ┣ 📂Signup
 ┃ ┣ 📂Trend
 ┃ ┣ 📂Weather
 ┃ ┗ 📂Wish
 ┣ 📂hooks
 ┣ 📂pages
 ┃ ┣ 📂Closet
 ┃ ┣ 📂MyAccount
 ┃ ┣ 📂Ootd
 ┃ ┗ 📂Wish
 ┣ 📂queries
 ┣ 📂shared
 ┣ 📂styles
 ┣ 📂types
 ┣ 📂utils
 ┣ 📜App.tsx
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

### 유저 플로우
![Userflow](https://github.com/user-attachments/assets/b671c13e-4cf1-4541-ad7e-52284132ba6e)

<br />

## 사용한 기술

사용한 기술|기술 선택 이유
:--:|:--
<img src="https://img.shields.io/badge/Yarn-2C8EBB?style=flat-square&logo=Yarn&logoColor=white" width="80px"/>|- 패키지 관리는 npm 대신 속도와 안정성 측면에서 보다 뛰어난 yarn을 선택했습니다. 
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white" width="80px"/>|- 개발 효율성과 속도를 위해 Vite를 선택했으며, 이는 CRA보다 빌드 속도와 서버 시작 시간이 훨씬 빠릅니다.
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white" width="130px"/>|- 협업을 해야하기 때문에 동적 타입을 제공하는 유연한 JavaScript 보다는 정적 타입을 제공하는 TypeScript를 사용하였습니다.<br/>코드 오류를 빠르게 잡고 데이터 구조를 명확하게 정의할 수 있어 가독성과 유지보수성을 높일 수 있기 때문에 협업에 필수적이라고 생각하였습니다.
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white" width="90px"/>|- Fetch API에 비해 다양한 기능을 제공하며 복잡한 HTTP 요청을 보다 쉽게 처리할 수 있는 Axios를 사용하였습니다.<br/>기본적인 HTTP 통신에 더해 axios가 가진 인스턴스 기능과 인터셉터 기능을 활용하면 저희가 원하는 것을 보다 손 쉽게 구현할 수 있을 거라 생각하여 선택했습니다.
<img src="https://img.shields.io/badge/TanStackQuery-FF4154?style=flat-square&logo=ReactQuery&logoColor=white" width="180px"/>|- TanStackQuery는 데이터 패칭, 캐싱, 서버 상태 관리를 효율적으로 관리하고 처리할 수 있어서 선택했습니다.<br/>- 비동기 데이터 관리를 해결할 수 있었기 때문에, 저희 프로젝트의 경우 클라이언트 전역 상태 관리를 위한 Redux나 zustand 같은 라이브러리를 추가할 필요는 크게 없었습니다. 전역으로 관리하기도 하는 모달 등은 추가적인 라이브러리 설치 없이 리액트 포탈과 커스텀 훅을 사용하여 처리하였습니다.
<img src="https://img.shields.io/badge/StyledComponent-DB7093?style=flat-square&logo=styledcomponents&logoColor=white" width="450px"/>|- 스타일링은 유지보수성과 가독성 문제로 Tailwind CSS 대신 스타일컴포넌트를 선택했습니다.<br/>컴포넌트 기반으로 CSS를 작성할 수 있으며, 고유한 클래스 이름을 생성해 CSS 충돌을 방지하고 재사용성을 높일 수 있고, theme 설정이 가능하다는 장점이 있습니다.
<img src="https://img.shields.io/badge/ReactRouter-CA4245?style=flat-square&logo=reactrouter&logoColor=white" width="140px"/>|- React 환경에서 라우팅과 페이지 설계를 간편하게 처리할 수 있는 React Router를 사용하였습니다.<br/>SPA(Single Page Application)에서 페이지 간의 네비게이션을 쉽게 관리할 수 있고 Layout, Outlet 등의 기능을 사용할 수 있습니다.
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white" width="90px"/>|- 배포는 빠르고 간편하고 자동화된 CI/CD를 제공하는 Vercel을 사용하여 개발과 운영 효율성을 높였습니다.

<br />

## 화면 구성
|메인 페이지(비로그인 사용자)<br/>`/`|메인 페이지(로그인한 사용자)<br/>`/`|
|:--:|:--:|
|<img width="475" alt="메인 비로그인 사용자" src="https://github.com/user-attachments/assets/57a30d8f-96fb-461e-9133-854449863e4f">|<img width="473" alt="메인 로그인한 사용자" src="https://github.com/user-attachments/assets/6485d7d5-6d45-4d2b-b998-f771583cc875">|
|로그인 페이지<br/>`/login`|회원가입 페이지<br/>`/signup`|
|<img width="1440" alt="로그인" src="https://github.com/user-attachments/assets/c86e2095-7323-4c60-b734-4f3cac1c7068">|<img width="1440" alt="회원가입" src="https://github.com/user-attachments/assets/a26b35bf-5ff5-4297-9416-f2379a69c316">|
|마이페이지/My OOTD<br/>`/mypage`, `/mypage/myootd`|OOTD 게시글 생성/수정 페이지<br/>`/ootd/add`, `/ootd/:id/edit`|
|<img width="940" alt="마이ootd" src="https://github.com/user-attachments/assets/0f424bd2-3936-401a-96b6-b9831bcc1194">|<img width="1440" alt="ootd 등록" src="https://github.com/user-attachments/assets/8e64228a-829b-45c4-9dbb-fd5eb586f706">|
|마이페이지/내 옷장<br/>`/mypage/closet`|옷 게시글 생성/수정 페이지<br/>`/mypage/closet/add`, `/mypage/closet/:id/edit`|
|<img width="1440" alt="내 옷장" src="https://github.com/user-attachments/assets/6a028b10-ab01-4f39-bd80-de63814415a0">|<img width="1440" alt="옷 등록" src="https://github.com/user-attachments/assets/046606d2-5b4b-4edf-825a-f57e3e6e4e4a">|
|마이페이지/위시리스트<br/>`/mypage/wish`|위시리스트 상세 모달|
|<img width="1049" alt="위시리스트" src="https://github.com/user-attachments/assets/d2928a03-2e89-4a8b-b529-a64590ca1b0e">|<img width="1440" alt="위시리스트 상세 모달" src="https://github.com/user-attachments/assets/5215c700-9ff8-441d-844a-4dfce965d3d2">|
|트렌드 페이지<br/>`/ootd`|게시글 상세 페이지<br/>`/ootd/:id`|
|<img width="499" alt="트렌드" src="https://github.com/user-attachments/assets/4ed5a6b2-1f1b-4728-96a7-deec9d671ed9">|<img width="622" alt="게시글 상세 페이지" src="https://github.com/user-attachments/assets/11798f51-8b5c-4acd-83d8-6b7ccc5f6fcf">|
|내 계정 페이지<br/>`/my`|회원 정보 수정 페이지<br/>`/my/setting`|
|<img width="1440" alt="내 계정 페이지" src="https://github.com/user-attachments/assets/f58e4bc6-51c8-4762-ba7d-63a54d527175">|<img width="1440" alt="회원 정보 수정" src="https://github.com/user-attachments/assets/5f600044-018f-40d5-af8b-fe3855862554">|
|비밀번호 수정 페이지<br/>`/my/setting/password`|비밀번호 찾기 페이지<br/>`/login/find`|
|<img width="1440" alt="비밀번호 수정" src="https://github.com/user-attachments/assets/6c6b5236-3c6c-419c-86bc-6fd8d062b421">|<img width="1440" alt="비밀번호 찾기" src="https://github.com/user-attachments/assets/2b6dff13-706f-4d28-86e7-ac366aec96b3">|

<br />

## 주요 기능
<details>
  <summary>1. 소셜 로그인</summary>
	<div>
	회원가입 시, 발생되는 불편함을 해소하기 위해 소셜 로그인 기능을 이용할 수 있습니다.
	</div>
	<img alt="소셜 로그인" src="https://github.com/user-attachments/assets/89291d65-25a5-44a7-8a7f-6a9733a9148d">
</details>

<details>
  <summary>2. 날씨 정보</summary>
	<div>    
	사용자 위치 기반으로 날씨 정보를 얻을 수 있습니다. 카카오 맵을 통해 원하는 지역을 선택하거나 검색하면 그 지역의 날씨 정보도 얻을 수 있습니다.
		<br/>
    	날씨 정보를 바탕으로 오늘의 날씨를 브리핑하고, 기온에 맞는 옷을 추천해주는 기능이 있습니다.
	</div>
	<img width="1421" alt="메인 날씨 섹션" src="https://github.com/user-attachments/assets/de73ebae-f857-41e0-8f87-1dc9c5d7c20f">
</details>
    
<details>
  <summary>3. 사용자 맞춤 옷 추천</summary>
	<div>    
    	외출하기 전, “오늘 같은 날씨에는 무슨 옷을 입을까”에 대한 고민을 해결하기 위해
		<br/>
		오늘의 날씨 데이터, 내 옷장에 등록된 옷, 비슷한 날씨에 내가 입었던 옷차림, 다른 사용자의 옷차림 데이터를 기반으로 나만의 맞춤 옷차림을 추천합니다.
	</div>
	<img width="1421" alt="메인 추천 섹션" src="https://github.com/user-attachments/assets/f04d4ea1-91b4-4848-ba7e-dc0ba4196295">
</details>

<details>
  <summary>4. 위시리시트</summary>
	<div>    
    	네이버 쇼핑 API를 기반으로 현재 날씨에 맞는 옷을 사용자에게 추천합니다.
		<br/>마음에 드는 아이템은 하트를 눌러 위시리스트에 저장할 수 있습니다.
		<br/>위시리스트는 사용자가 담은 아이템을 편리하게 쇼핑할 수 있도록 옷에 대한 정보와 구매 링크를 제공합니다.
	</div>
	<img width="1421" alt="메인 위시리스트" src="https://github.com/user-attachments/assets/54f186fe-19d0-442a-b790-3b09a5f0a14a">
</details>

<details>
  <summary>5. 비밀번호 찾기</summary>
	<div>    
    	   사용자가 비밀번호를 잊어버린 경우, 문자를 통해서 비밀번호를 찾을 수 있습니다.
	</div>
</details>    

<details>
  <summary>6. 게시판 & 댓글</summary>
	<div>    
    	사용자는 OOTD(outfit of the day, 오늘의 옷 차림)를 등록하여 다른 사용자와 공유할 수 있습니다.
		<br/>게시물에 대한 의견을 자유롭게 댓글로 작성할 수 있습니다.
	</div>
	<img width="1421" alt="게시글 작성" src="https://github.com/user-attachments/assets/e4f838bc-d6b6-4755-a1ad-f9a9abff0df8">
	<img width="1421" alt="좋아요 댓글" src="https://github.com/user-attachments/assets/f88f1c00-8783-4d79-9541-a1733533dee0">
</details>

<details>
  <summary>7. 검색 기능</summary>
	<div>    
    사용자가 원하는 정보를 쉽게 찾고 검색 경험을 더욱 만족스럽게 느낄 수 있도록
    <br/>각 페이지에 맞는 키워드로 검색, 날씨 아이콘으로 검색, 옷 종류-컬러로 검색하는 기능을 제공합니다.
	</div>
	<img width="1421" alt="my ootd search" src="https://github.com/user-attachments/assets/3716661e-d560-4a82-88cd-2cd0f18c1756">
	<img width="1421" alt="wishlist search" src="https://github.com/user-attachments/assets/11f219e2-9eca-49f9-aeed-72a82e001104">
	<img width="1421" alt="trend search" src="https://github.com/user-attachments/assets/139cbd36-b5b5-484b-b40d-4b8ff52cb373">
</details>

<br />

## 트러블 슈팅
<details>
  <summary>1. 메인 페이지 진입 시 무한 렌더링 발생</summary>
   <h4>문제점</h4>
   메인 페이지 진입시 무한 렌더링이 발생하여 브라우저가 심하게 버벅이는 현상이 있었다.
   <br/>
   메인 페이지에서 추천 api의 응답 데이터는 모두 배열로, 각 추천 섹션 컴포넌트의 props로 전달되고 있는 상황이었다.
   <br/>
   조건에 일치하는 요소는 다 배열에 넣어져 응답 값으로 오고 있기 때문에 각 섹션별로 화면에 렌더링 해야 할 number값 으로 랜덤 요소가 뽑힐 때 까지 while문과 set을 사용하여 필요한 인덱스 만큼 랜덤 배열을 새로 생성하는 작업을 했었다.
   <h4>원인</h4>
   하지만 사용자 위치 기반 날씨 정보에 따라 추천 api에 전달되는 코드 값이 달라지기 때문에 어떤 때는 배열 안에 든 요소가 많고 어떤 때는 빈 배열이거나 한 두개의 요소만 배열에 들어 있는 것을 확인하였다.
   <br/>
   기존에 설정해 둔 값 보다 적은 빈 배열, 또는 index 수가 부족한 배열이 응답 데이터로 왔기 때문에 기작성한 while 문을 사용할 경우 무한 렌더링이 발생할 수 밖에 없었다.
   <h4>해결방법</h4>
   각 추천 섹션별 조건문 처리 및 slice함수를 사용하여 필요한 만큼의 인덱스만 잘라서 사용하도록 수정하여 해결하였다.
   <br/>
   이 문제를 해결하며 배열의 특징과 각 메서드를 어떻게 사용해야 할지 알게되었다.
</details>

<br />

## 프론트엔드팀의 프로젝트 목표 및 노력
### FE 프로젝트 목표
프론트엔드의 목표는 가시성과 일관성을 갖춘 명확한 UI를 설계하고, 반응형 디자인을 통해 다양한 디바이스에서 일관된 사용자 경험(UX)을 제공하고자 했습니다. 이를 통해 사용자가 인터페이스를 직관적으로 이해하고 쉽게 사용할 수 있도록 UI를 구성하였고, 상태 관리를 효율적으로 처리하기위해 노력하였습니다.

### UI/UX를 위한 노력
1. 반응형 디자인: 플렉스, 그리드, 미디어 쿼리 등을 이용하여 다양한 디바이스에서 일관된 사용자 경험(UX)을 제공하고자 했습니다.
2. 정보의 시각화 (날씨 정보, 색깔, 아이콘 등): 데이터 정보를 시각화하여 사용자가 인터페이스를 직관적으로 이해하고 쉽게 사용할 수 있도록 UI를 구성하였습니다.
   - 날씨 데이터를 가공하여 날씨에 맞는 배경 화면, 날씨 아이콘등을 사용한 점
   - 사용자가 게시글을 업로드할 때, 컬러 바를 사용한 점
   - 검색 기능을 구현할 때, 단순한 키워드 입력뿐만 아니라 컬러 칩과 아이콘을 활용하여 시각적으로 더 풍부하고 직관적인 UI/UX를 제공했습니다. 이를 통해 사용자가 원하는 정보를 쉽게 찾고, 검색 경험을 더욱 만족스럽게 느낄 수 있도록 설계했습니다.
3. 일관된 디자인 시스템: 통일된 UI 요소와 디자인 패턴을 통해 일관된 경험 제공
4. 인터랙티브 요소 추가:사용자와의 상호작용을 높이기 위한 애니메이션 하트 버튼 디자인 5. 에러핸들링: 폼 에러 발생시 검증을 통하여 사용자에게 에러를 표시하여 사용자가 폼을 입력할 때 어떤 요구사항이 충족되지 못했는지를 쉽게 알 수 있도록 하였습니다.
5. 사용자 피드백 반영: 사용자의 피드백을 적극적으로 수용하여 UI/UX를 개선하였습니다.(팀원 들 및 지인) 
   특히, 게시글이 없거나 찾는 게시글이 없을 때에도 사용자가 시각적으로 잘 인식할 수 있도록 탠스택쿼리의 플래그 값을 사용하여 에러 알림 컴포넌트를 렌더링 할 수 있도록 UX를 개선했습니다.

### 기술적인 노력
1. 중첩라우팅
2. 검색 기능 구현
3. 페이지네이션 및 무한 스크롤 구현
4. 데이터 캐싱 및 패칭
5. JWT 사용과 axios의 헤더 설정 및 interceptor 처리
6. SEO 개선


<br/>

## 성능 측정 및 개선
### 기존 측정값
<img width="436" alt="기존 측정 값" src="https://github.com/user-attachments/assets/d9aeea90-0bed-4a8d-8aa3-bd0584c0e3b4">

1. 성능: 62
2. 접근성: 75
3. 권장사항: 78
4. SEO: 67

### 개선 후 측정값
<img width="477" alt="개선 후 측정값" src="https://github.com/user-attachments/assets/587d981c-e152-47af-9285-d5dc42af842a">

#### 1. 성능:  62 → 100 (🔺 61.29% 개선!)

1. TanStackQuery의 flag 값 이용하여 데이터 받아온 경우에만 데이터 가져오도록 처리
2. api 조회 요청 시 enable 값 추가하여 true인 경우만 api 요청 보내도록 처리
3. 배열을 처리하는 로직 문제

<details>
  <summary>성능 진단 및 개선 가능한 점</summary>
   <b>1. 카카오맵 SDK 및 API를 사용해야 하기 때문에 어쩔 수 없는 부분</b><br/>
   - ❎ 렌더링 차단 리소스 제거하기 -  절감 가능치: 200ms<br/>
- ❎ 사용하지 않는 자바스크립트 줄이기  -  절감 가능치: 128KiB<br/>
- ❎ 레거시 JavaScript를 최신 브라우저에게 제공하지 않기  -  절감 가능치: 32KiB<br/>
- ❎ 효율적인 캐시 정책을 사용하여 정적인 애셋 제공하기 - 리소스 7개 발견됨<br/>
- ❎ document.write() 피하기<br/>
<br/>
  <b>2. 성능 개선 좀 더 가능한 부분</b><br/>
 - ✅ 이미지 요소에 width 및 height가 명시되어 있지 않습니다<br/>
	현재 width를 auto로 설정해 뒀는데 명시적인 값을 제공하면 해결 될 것 같다.<br/>
</details>

#### 2. 접근성: 75 → 100 (🔺 33.33% 개선!)

1. 이미지 태그에 alt 속성 값을 명시하여 접근성을 높였습니다.
2. semantic한 태그만 사용했다고 말할 수는 없지만 최대한 큰 골격 레이아웃의 경우 header, main, section, footer 를 활용하여 구성하였습니다.

#### 3. 권장사항: 78 → 96 (🔺 23.08% 개선!)

1. 좀 더 개선할 수 있는 점
   - 위치정보 권한 요청에 대해 사용자의 작업 요청 입력을 고려해 보는 것도 좋겠습니다.<br/>

#### 4. 검색엔진 최적화: 67 → 92 (🔺 37.31% 개선!)

1. index.html에 meta tag 추가로 SEO를 개선했습니다.
   - twitter:card 및 og 메타 태그도 적용하여, 소셜 공유시 사이트에 대한 기본 정보 확인할 수 있도록 설정하였습니다.<br/>
   - 아래 이미지는 카카오 톡으로 사이트 공유시 위 사항이 적용된 모습입니다.<br/>
     <img width="339" alt="메타태그 적용" src="https://github.com/user-attachments/assets/de20a8d4-9ded-4df7-ac58-b47b68fda251"><br/>
   - 하지만 리액트는 기본적으로 SPA이기 때문에 페이지나 게시글 마다 정보가 달라지지는 않아서 조금 아쉬움이 있습니다.<br/>
   - 이 부분은 Helmet, snap 같은 라이브러리의 도움을 받으면 개선할 수 있을 것으로 예상됩니다.
   
2. 좀 더 개선할 수 있는 점: robots.txt 생성
   - robots.txt 생성하여 웹 크롤러가 사이트의 정보를 읽을 수 있도록 설정하면 검색 엔진 최적화를 더 개선할 수 있을 것으로 예상됩니다.
