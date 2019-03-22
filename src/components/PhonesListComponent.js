import React, { useState } from 'react'
import styled from 'styled-components';


export function PhoneListComponent(props) {
    const {phones, onPhoneClick} = props;
    return (
        <PhoneList>
            {phones == null ? null : phones.map((ph, index) => (
                <PhoneListItem key={index}
                               isBooked={ph.status}
                               onClick={() => onPhoneClick(ph)}>
                    <div>{ph.phone}</div>
                    <div>{ph.status}</div>
                </PhoneListItem>
            ))}
        </PhoneList>
    );
}

const PhoneList = styled.div`

`;
const PhoneListItem = styled.div`
    background-color: ${props => props.isBooked ? '#f17b7b' : 'white'};
    font-weight: 600;
    padding: 10px;
    margin-bottom: 5px;
    box-shadow: 1px 1px 1px #f3e6e6;
    cursor: pointer;
`;