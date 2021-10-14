import React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../atom';

import KAKAO_LOGIN_SHORT from '../../assets/KAKAO_LOGIN_SHORT.png';
import NAVER_LOGIN from '../../assets/NAVER_LOGIN.png';
import UserInfoCard from './UserInfoCard';
import UserLoginButton from './UserLoginButton';

const UserCard = () => {
  const [userInfo] = useRecoilState(userState);

  return (
    <>
      {userInfo === null || userInfo === undefined ? (
        <>
          <UserLoginButton
            image={KAKAO_LOGIN_SHORT}
            right={'10px'}
            provider="kakao"
          />
          <UserLoginButton
            image={NAVER_LOGIN}
            width={'100px'}
            right={'110px'}
            provider="naver"
          />
        </>
      ) : (
        <UserInfoCard />
      )}
    </>
  );
};

export default UserCard;
