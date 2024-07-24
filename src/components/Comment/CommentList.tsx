// import Button from "@components/Button";
// import useGetCommentList from "@/hooks/useGetCommentList";
import CommentItem from "@components/Comment/CommentItem";
import Icon from "@components/Icon";
import { chatIcon } from "@shared/icons";
import { useState } from "react";
import styled from "styled-components";

interface CommentListProps {
  board_id: string;
}

export default function CommentList({ board_id }: CommentListProps) {
  //투두에 달린 댓글 전체 리스트
  // const { commentList } = useGetCommentList(board_id);
  const commentList = [
    {
      id: "1",
      user_id: "아이디123",
      board_id: { board_id },
      regist_date: "2024.07.24",
      update_date: null,
      contents: "댓글 내용",
      comment_like: [
        {
          id: "11",
          user_id: "아이디1",
          comment_id: "123",
        },
        {
          id: "12",
          user_id: "아이디2",
          comment_id: "123",
        },
      ],
    },
    {
      id: "2",
      user_id: "아이디1",
      board_id: { board_id },
      regist_date: "2024.07.24",
      update_date: null,
      contents: "댓글 내용",
      comment_like: [
        {
          id: "11",
          user_id: "아이디1",
          comment_id: "123",
        },
        {
          id: "12",
          user_id: "아이디2",
          comment_id: "123",
        },
      ],
    },
  ];

  // 현재 수정 중인 댓글 id 확인용 상태
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  // 에디팅 모드 시작하는 함수
  const handleEditStart = (commentId: string) => {
    setEditingCommentId(commentId);
  };

  // 에디팅 모드 종료하는 함수
  const handleEditEnd = () => {
    setEditingCommentId(null); //댓글 id값 비우기
  };

  return (
    <>
      <Title>
        <Icon icon={chatIcon} />
        댓글 {commentList?.length ?? `0`}
      </Title>
      <UlComments>
        {commentList?.map((item) => {
          return (
            <LiComments key={item.id}>
              <CommentItem
                id={item.id}
                user_id={item.user_id}
                contents={item.contents}
                board_id={item.board_id.board_id}
                isEditing={editingCommentId === item.id} //아이디값 동일한 CommentItem 컴포넌트에 대해 에디팅 진행
                onEditStart={() => handleEditStart(item.id)} //에디팅 시작하는 함수 밑으로 내려주기
                onEditEnd={handleEditEnd} //에디팅 종료하는 함수 밑으로 내려주기
              />
            </LiComments>
          );
        })}
      </UlComments>
    </>
  );
}

export const Title = styled.div`
  border-bottom: ${({ theme }) => theme.borders.containerBorder};
  padding-bottom: 0.5rem;
  width: 100%;
  display: flex;
  gap: 1rem;
  font-size: small;
  font-weight: 600;
`;

export const UlComments = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const LiComments = styled.li`
  position: relative;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
