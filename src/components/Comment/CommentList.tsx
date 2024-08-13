import CommentItem from "@components/Comment/CommentItem";
import Icon from "@components/Icon";
import { Comment } from "@queries/commentQueries";
import { chatIcon } from "@shared/icons";
import { useState } from "react";
import styled from "styled-components";

interface CommentListProps {
  boardId: number;
  comments: Comment[];
  isSuccessComments: boolean;
  myId: number;
}

export default function CommentList({
  // boardId,
  comments,
  isSuccessComments,
  myId,
}: CommentListProps) {
  //투두에 달린 댓글 전체 리스트
  // const { id: boardId } = useParams();

  // 현재 수정 중인 댓글 id 확인용 상태
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  // 에디팅 모드 시작하는 함수
  const handleEditStart = (commentId: number) => {
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
        댓글 {comments?.length ?? `0`}
      </Title>
      <UlComments>
        {isSuccessComments &&
          comments.map((item) => {
            return (
              <LiComments key={item.id}>
                <CommentItem
                  myId={myId}
                  comment={item}
                  isEditing={editingCommentId === item.id} //아이디값 동일한 CommentItem 컴포넌트에 대해 에디팅 진행
                  onEditStart={() => handleEditStart(item.id)} //에디팅 시작하는 함수 밑으로 내려주기
                  onEditEnd={handleEditEnd} //에디팅 종료하는 함수 밑으로 내려주기
                />
              </LiComments>
            );
          })}
        {comments?.length === 0 && (
          <NoComments>아직 댓글이 없어요.</NoComments>
        )}
      </UlComments>
    </>
  );
}

export const Title = styled.div`
  border-bottom: ${({ theme }) => theme.borders.containerBorder};
  padding: 1rem 0;
  width: 100%;
  display: flex;
  gap: 1rem;
  font-size: small;
  font-weight: 600;
  @media (max-width: 600px) {
    padding-bottom: 1rem;
  }
`;

export const UlComments = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  border-bottom: ${({ theme }) => theme.borders.containerBorder};
`;

export const LiComments = styled.li`
  position: relative;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const NoComments = styled.div`
  display: flex;
  padding: 2rem 0rem;
  font-size: small;
`;
