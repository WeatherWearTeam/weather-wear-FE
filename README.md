# 🎲 규칙 (코드 컨벤션)

## 📝 이름 규칙
|분류|설명 및 예시|
| --- | --- |
|컴포넌트 이름 | PascalCase (파스칼 케이스)<br/>첫글자와 이어지는 단어의 첫글자를 대문자로 표기하는 방법<br/>예) `GoodPerson`, `MyKakaoCake`, `IAmDeveloper`<br/><br/>common한 컴포넌트일 경우 요소 이름 그대로<br/>- 예) `<Input>`, `<Button>`, `<Textarea>`<br/><br/>기능별 컴포넌트일 경우 그 기능이 뭔지 잘 드러나도록 명명<br/>- 예) 로그인 폼  `<LoginForm>`, 댓글 추가/수정 폼 `<CommentForm>`|
| 변수, 함수, 인스턴스 이름 | Camel Case 기법사용하기<br/>첫단어는 소문자로 표기하지만, 이어지는 단어의 첫글자는 대문자로 표기<br/>- 예) `goodPerson`, `myKakaoCake`, `iAmDeveloper` |
| 상수변수 이름(constant variable) | UPPER_CASE (어퍼 케이스) 사용하기<br/>- 예) `GOOD_PERSON`, `MY_KAKAO_CAKE`, `I_AM_DEVELOPER` |
| 약어사용 지양 | 약어가 필요하다고 판단되는 경우 팀원과 상의 |
| 주석 규칙 | 한줄은 `//`로 적고, 그 이상은 `/** */`로 주석 작성 |
| 함수명 작성 | 함수명을 작성할 때는 `동사+명사` 형태로 구성<br/>- 예) `getCommentById`, `changeInput`|
| 스타일 컴포넌트 이름 | 스타일 컴포넌트가 어떤 기능 혹은 요소를 담고 있는지 표현할 수 있는 이름<br/>- 예) `Title` , `Content`<br/><br/>스타일 컴포넌트의 경우 스타일 작성 완료 및 코드 리뷰 후 컴포넌트에서 분리하여 /styles 폴더로 이동<br/><br/>S dot 기법 사용 |


## 📝 커밋 규칙
|Type Tag|Description|
| --- | --- |
|[FEAT] : |기능 개발 및 기능 추가|
|[FIX] :|버그 수정|
|[DESIGN] :|UI 디자인 변경|
|[!BREAKING CHANGE] :|커다란 API 변경의 경우(URI 주소 외 Request, Response 가 변경되는 경우)|
|[!HOTFIX] :|급하게 치명적인 버그를 고쳐야하는 경우|
|[STYLE] :|코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우|
|[REFACTOR] :|코드 리팩토링|
|[TEST] :|테스트 코드, 리펙토링 테스트 코드 추가, Production Code(실제로 사용하는 코드) 변경 없음|
|[MERGE] :|병합|
|[CONFLICT] :|병합 시 충돌 해결|
|[DEPLOY] :|배포 관련 커밋|
|[REMOVE] :|파일을 삭제하는 작업만 수행한 경우|
|[RENAME] :|파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우|
|[UPDATE] :|리드미 업데이트|

### 푸터 예시
```
[type] : subject(제목. 최대한 간략하고 핵심내용만)

body(내용. 자세한 설명.)

footer(꼬릿말. 필수사항은 아님)
```

### 커밋 작성 예시
```
[FEAT] : ToDoList Add

ToDoList가 추가되는 기능을 구현하였습니다.

TextInput에 텍스트를 작성합니다
Button 클릭 시 해당 텍스트가 ToDoList에 저장됩니다.

Resloves(해결됨) : #3
Ref(참고이슈) : #1
```

## 📌 커밋 순서
1. 본인 브런치에서 작성 후 커밋 & 푸시
2. `main` 브런치로 pr 후 코드리뷰
3. 코드리뷰 완료 후, 부리더가 `main` 브런치로 merge
4. 반복

# 🎨 와이어 프레임 참고
[피그마](https://www.figma.com/design/M0wKraRjm4ktcKjfeBjkqQ/2%EC%A1%B0-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?node-id=0-1&t=zhwpSm9TstOSDX8T-1)
