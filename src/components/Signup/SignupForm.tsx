import { User } from "@store/authStore";
import Button from "@components/Button";
import Input from "@components/Input";
import { useCreateUser } from "@queries/userQueries";
import { useState } from "react";
import styled from "styled-components";

interface SignupFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  signUpUser: User;
}

export default function SignupForm() {
  //   onChange,
  //   onSubmit,
  //   signUpUser
  const [signUpUser, setSignUpUser] = useState({
    EMAIL: "",
    NICKNAME: "",
    PASS1: "",
    PASS2: "",
    BIRTHDAY: "",
    GENDER: "",
  });

  const { mutateCreateUser, isError, isPending, isSuccess } = useCreateUser();

  const changeNewUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpUser({ ...signUpUser, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const newUser = {
      email: signUpUser.EMAIL,
      nickname: signUpUser.NICKNAME,
      password: signUpUser.PASS1,
      passwordCheck: signUpUser.PASS2,
      birthday: signUpUser.BIRTHDAY,
      gender: signUpUser.GENDER,
    };

    // console.log(newUser);
    mutateCreateUser(newUser);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FlexRow>
        <FlexColum>
          <Label>이메일</Label>
          <Input
            label="이메일"
            type="email"
            name="EMAIL"
            value={signUpUser.EMAIL}
            onChange={changeNewUser}
          />
        </FlexColum>
        <FlexColum>
          <Label>닉네임</Label>
          <Input
            label="닉네임"
            type="text"
            name="NICKNAME"
            value={signUpUser.NICKNAME}
            onChange={changeNewUser}
          />
        </FlexColum>
        {/* <SelectButton selectedOption="위치" /> */}
      </FlexRow>

      <FlexRow>
        <Input
          label="비밀번호"
          type="password"
          name="PASS1"
          value={signUpUser.PASS1}
          onChange={changeNewUser}
        />
        <Input
          label="비밀번호"
          type="password"
          name="PASS2"
          value={signUpUser.PASS2}
          onChange={changeNewUser}
        />
      </FlexRow>

      <FlexRow>
        <Input
          label="생년월일"
          type="date"
          name="BIRTHDAY"
          value={signUpUser.BIRTHDAY}
          onChange={changeNewUser}
        />

        <Fieldset>
          <Legend>성별</Legend>
          <InputContainer>
            <RadioInputWrapper>
              <input
                type="radio"
                id="Male"
                name="GENDER"
                value="Male"
                checked={signUpUser.GENDER === "Male"}
                onChange={changeNewUser}
              />
              <label htmlFor="Male">남자</label>
            </RadioInputWrapper>
            <RadioInputWrapper>
              <input
                type="radio"
                id="Female"
                name="GENDER"
                value="Female"
                checked={signUpUser.GENDER === "Female"}
                onChange={changeNewUser}
              />
              <label htmlFor="Female">여자</label>
            </RadioInputWrapper>
          </InputContainer>
        </Fieldset>
      </FlexRow>
      <Button type="submit">가입하기</Button>
    </Form>
  );
}

//📝 폼
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;

const FlexColum = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const Label = styled.label`
  width: 100%;
  font-weight: 600;
`;

const Fieldset = styled.fieldset`
  border: ${({ theme }) => theme.borders.containerBorder};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  gap: 2rem;
  position: relative;
`;

const Legend = styled.legend`
  position: absolute;
  left: 1rem;
  top: 50%; //수직 중앙
  transform: translateY(-50%); //중앙정렬
  font-size: small;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 3.5rem;
`;

const RadioInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  label {
    font-size: small;
  }
`;

//
