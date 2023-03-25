import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../config/color';

import { db, authService, storage } from '../config/firebase';


const AuctionListPage = () => {

    const navigate = useNavigate();
    const goAuctionUpPage = () => {
        navigate(`/auction/auctionUp`);
    };
    return(
        <button onClick={goAuctionUpPage}>글올리기</button>
    );

    
};

export default AuctionListPage;
