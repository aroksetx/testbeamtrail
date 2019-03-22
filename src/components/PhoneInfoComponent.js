import styled from 'styled-components';
import React from 'react'
import useInputValue from '@rehooks/input-value'


export function PhoneInfoComponent(props) {
    const {phoneInfo, chousedPhone, onBookPhone} = props;
    const {technology, _3g_bands, _2g_bands, _4g_bands} = phoneInfo;
    let name = useInputValue('');
    const date = !chousedPhone.status ? null : new Date();
    const dateForUser = date == null ? '-' : `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    return (
        <InfoWrapper>
            <div>
                <h3>{chousedPhone.phone}</h3>
                <InfoBlockWrapper>
                    <InfoBlockHeader>Technology</InfoBlockHeader>
                    <InfoBlockDescription>{technology === null ? '-' : technology}; </InfoBlockDescription>
                </InfoBlockWrapper>

                <InfoBlockWrapper>
                    <InfoBlockHeader>2G</InfoBlockHeader>
                    <InfoBlockDescription> {_2g_bands === null ? '-' : _2g_bands} </InfoBlockDescription>
                </InfoBlockWrapper>

                <InfoBlockWrapper>
                    <InfoBlockHeader>3G</InfoBlockHeader>
                    <InfoBlockDescription>{_3g_bands === null ? '-' : _3g_bands} </InfoBlockDescription>
                </InfoBlockWrapper>

                <InfoBlockWrapper>
                    <InfoBlockHeader>4G</InfoBlockHeader>
                    <InfoBlockDescription> {_4g_bands === null ? '-' : _4g_bands} </InfoBlockDescription>
                </InfoBlockWrapper>
            </div>

            <UserInfo>
                <UserInfoBlock>
                    <UserInfoBlockTitle>Username</UserInfoBlockTitle>
                    <UserInfoBlockTitleValue>
                        {chousedPhone.hasOwnProperty('bookedBy') && chousedPhone.bookedBy != null && chousedPhone.status
                        ? chousedPhone.bookedBy
                        : <UserName {...name} />}
                    </UserInfoBlockTitleValue>
                </UserInfoBlock>
                <UserInfoBlock>
                    <UserInfoBlockTitle>Booked date</UserInfoBlockTitle>
                    <UserInfoBlockTitleValue>{dateForUser}</UserInfoBlockTitleValue>
                </UserInfoBlock>
            </UserInfo>

            <BookButton status={chousedPhone.status} onClick={() => onBookPhone(name.value === '' ? null : name.value, )}>
                {!chousedPhone.status ? 'Book' : 'Return'}
            </BookButton>
        </InfoWrapper>
    )
}

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 5px;
`;
const UserInfoBlock = styled.div`
  flex: 1 1 25%;
  margin: 4px;
`;
const UserInfoBlockTitle = styled.div`
    background-color: #00fa81;
    padding: 5px;
    text-align: center;
    font-weight: 600;
    text-decoration: underline;
    
`;
const UserInfoBlockTitleValue = styled.div`
    padding: 5px;
    text-align: center;
`;

const UserName = styled.input`
    width: 80%;
    margin: auto;
`;

const BookButton = styled.div`
    background-color: ${props => props.status ? '#5a88e7' : '#5ae787'};
    text-align: center;
    padding: 5px;
    font-weight: 600;
    cursor: pointer;
`;

const InfoWrapper = styled.div`
    background-color: #fff;
    height: 100vh;
    position: fixed;
    z-index: 10;
    width: 40vw;
    right: 0;
    box-shadow: -1px 0px 20px 0px rgba(0, 0, 0, 0.59);
    padding: 20px;
`;

const InfoBlockWrapper = styled.div`
  padding: 5px;
  margin: 5px;
`;

const InfoBlockHeader = styled.div`
  background-color: #9d9a9a;
    text-align: center;
    padding: 10px;
    font-weight: 800;
`;

const InfoBlockDescription = styled.div`
  
`;