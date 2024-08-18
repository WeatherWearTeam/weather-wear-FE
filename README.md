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
  - [성능 개선](#성능-개선)

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
|<img src="https://github.com/user-attachments/assets/2ce74d31-062e-42cd-9291-57dfd93af169" width="120px;" alt="이미지"/>|<img src="https://github.com/user-attachments/assets/080936e6-8725-4b34-b030-b341587bc035" width="120px;" alt="이미지"/>|
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
|메인 페이지(비로그인)|메인 페이지(로그인)|
|:--:|:--:|
|||
|로그인 페이지|회원가입 페이지|
|||
|마이페이지/My OOTD|OOTD 게시글 생성/수정 페이지|
|||
|마이페이지/내 옷장|옷 게시글 생성/수정 페이지|
|||
|마이페이지/위시리스트|위시리스트 상세 모달|
|||
|트렌드 페이지|게시글 상세 페이지|
|||
|내 계정 페이지|회원 정보 수정 페이지|
|||
|비밀번호 수정 페이지|비밀번호 찾기 페이지|
|||

<br />

## 주요 기능
<details>
  <summary>⭐ 소셜 로그인</summary>
	<div>
	👉 회원가입 시, 발생되는 불편함을 해소하기 위해 소셜 로그인 기능을 이용할 수 있습니다.
	</div>
	<img src="https://github.com/user-attachments/assets/89291d65-25a5-44a7-8a7f-6a9733a9148d" alt="소셜 로그인 GIF">
</details>

<details>
  <summary>⭐ 날씨 정보</summary>
	<div>    
	👉 사용자 위치 기반으로 날씨 정보를 얻을 수 있습니다. 카카오 맵을 통해 원하는 지역을 선택하거나 검색하면 그 지역의 날씨 정보도 얻을 수 있습니다. 
    	날씨 정보를 바탕으로 오늘의 날씨를 브리핑하고, 기온에 맞는 옷을 추천해주는 기능이 있습니다.
	</div>
	<img width="1421" alt="스크린샷 2024-08-14 오전 10 44 04" src="https://github.com/user-attachments/assets/de73ebae-f857-41e0-8f87-1dc9c5d7c20f">
</details>
    
<details>
  <summary>⭐ 사용자 맞춤 옷 추천</summary>
	<div>    
    	👉 외출하기 전, “오늘 같은 날씨에는 무슨 옷을 입을까”에 대한 고민을 해결하기 위해 오늘의 날씨 데이터, 내 옷장에 등록된 옷, 비슷한 날씨에 내가 입었던 옷차림, 다른 사용자의 옷차림 데이터를 기반으로 나만의 맞춤 옷차림을 추천합니다.
	</div>
	<img width="1421" alt="스크린샷 2024-08-14 오전 10 44 04" src="https://github.com/user-attachments/assets/f04d4ea1-91b4-4848-ba7e-dc0ba4196295">
</details>

<details>
  <summary>⭐ 위시리시트</summary>
	<div>    
    	👉 네이버 쇼핑 API를 기반으로 현재 날씨에 맞는 옷을 사용자에게 추천합니다. 마음에 드는 아이템은 하트를 눌러 위시리스트에 저장할 수 있습니다. 위시리스트는 사용자가 담은 아이템을 편리하게 쇼핑할 수 있도록 옷에 대한 정보와 구매 링크를 제공합니다.
	</div>
	<img width="1421" alt="스크린샷 2024-08-14 오전 10 44 04" src="https://github.com/user-attachments/assets/54f186fe-19d0-442a-b790-3b09a5f0a14a">
</details>

<details>
  <summary>⭐ 비밀번호 찾기</summary>
	<div>    
    	    👉 사용자가 비밀번호를 잊어버린 경우, 문자를 통해서 비밀번호를 찾을 수 있습니다.
	</div>
</details>    

<details>
  <summary>⭐ 게시판 & 댓글</summary>
	<div>    
    	👉 사용자는 OOTD(outfit of the day, 오늘의 옷 차림)를 등록하여 다른 사용자와 공유할 수 있습니다. 게시물에 대한 의견을 자유롭게 댓글로 작성할 수 있습니다.
	</div>
	<img width="1421" alt="스크린샷 2024-08-14 오전 10 44 04" src="https://github.com/user-attachments/assets/e4f838bc-d6b6-4755-a1ad-f9a9abff0df8">
	<img width="1421" alt="스크린샷 2024-08-14 오전 10 44 04" src="https://github.com/user-attachments/assets/f88f1c00-8783-4d79-9541-a1733533dee0">
</details>

<details>
  <summary>⭐ 검색 기능</summary>
	<div>    
    👉 사용자가 원하는 정보를 쉽게 찾고 검색 경험을 더욱 만족스럽게 느낄 수 있도록
    각 페이지에 맞는 키워드로 검색, 날씨 아이콘으로 검색, 옷 종류-컬러로 검색하는 기능을 제공합니다.
	</div>
	<img width="1421" alt="스크린샷 2024-08-14 오전 10 44 04" src="https://github.com/user-attachments/assets/3716661e-d560-4a82-88cd-2cd0f18c1756">
	<img width="1421" alt="스크린샷 2024-08-14 오전 10 44 04" src="https://github.com/user-attachments/assets/11f219e2-9eca-49f9-aeed-72a82e001104">
	<img width="1421" alt="스크린샷 2024-08-14 오전 10 44 04" src="https://github.com/user-attachments/assets/139cbd36-b5b5-484b-b40d-4b8ff52cb373">
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


## 성능 개선
