import { useEffect, useState, useRef, useCallback } from "react";

export default function useDropdownPosition(isVisible: boolean) {
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
    width: 0,
  });

  const divRef = useRef<HTMLDivElement>(null);

  //isVisible 상태가 변경될 때마다 함수 재생성되지 않도록 메모이제이션
  const updateDropdownPosition = useCallback(() => {
    if (divRef.current && isVisible) {
      const rect = divRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY, //스크롤 따라서도 바뀌도록
        right: window.innerWidth - rect.right + window.scrollX,
        width: rect.width,
      });
    }
  }, [isVisible]);

  //드롭다운 위치 업데이트
  useEffect(() => {
    if (isVisible) {
      updateDropdownPosition(); // 드롭다운 위치 초기화
      //창 크기, 스크롤 위치 변경시 드롭다운 위치 재조정
      window.addEventListener("resize", updateDropdownPosition);
      window.addEventListener("scroll", updateDropdownPosition);
    }

    // 클린업 펑션: 컴포넌트 언마운트시 이벤트 핸들러 제거로 메모리 누수 방지
    return () => {
      window.removeEventListener("resize", updateDropdownPosition);
      window.removeEventListener("scroll", updateDropdownPosition);
    };
  }, [isVisible, updateDropdownPosition]);

  return { dropdownPosition, divRef };
}

//Element.getBoundingClientRect() 메서드는 엘리먼트의 크기와 뷰포트에 상대적인 위치 정보를 제공하는 DOMRect 객체를 반환
//left, top, right, bottom, x, y, width, height 프로퍼티는 전반적인 사각형의 위치와 크기를 픽셀 단위로 나타냄 (MDN)
//https://developer.mozilla.org/ko/docs/Web/API/Element/getBoundingClientRect
