import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../common/color';

import { db, authService, storage } from '../config/firebase';
import useUser from '../hooks/useUser';

const AuctionListPage = () => {
  const user = useUser();

  const navigate = useNavigate();
  const goAuctionUpPage = () => {
    navigate(`/auction/auctionUp`);
  };
  if (user) return <button onClick={goAuctionUpPage}>글올리기</button>;
};

export default AuctionListPage;
