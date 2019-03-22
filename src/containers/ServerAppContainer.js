import React, { Component } from 'react';
import { PhoneInfoHelper } from '../helpers/PhoneInfoHelper';
import {  ACCESS_FONOAPI_TOKEN } from '../config/access-configs';
import styled from 'styled-components';
import { PhoneListComponent } from '../components/PhonesListComponent';
import { PhoneInfoComponent } from '../components/PhoneInfoComponent';
import { ServerApiHelper } from '../helpers/ServerApiHelper';

class ServerAppContainer extends Component {
    state = {
        phoneInfo: {
            technology: null,
            _2g_bands: null,
            _3g_bands: null,
            _4g_bands: null,
            status: null
        },
        phones: [],
        chousedPhone: null
    }

    componentWillMount() {
        ServerApiHelper.get('/phones').then(({data})=>{
            this.setState({phones: data, chousedPhone: null})
        }).catch(console.warn);
    }


    async getPhoneData(device) {
        let fData = new FormData();
        fData.set('token', ACCESS_FONOAPI_TOKEN);
        fData.set('device', device);
        try {
            const {data} = await PhoneInfoHelper.post('/getdevice', fData);
            const res = data.length > 0 ? this.filterPhoneModel(data, device) : data[0];
            this.setState({phoneInfo: res});
        } catch (e) {
            console.warn('Error: ', e);
        }
    }

    filterPhoneModel(phoneList, device) {
        return phoneList.find(({DeviceName}) => DeviceName.trim().replace(' ', '').toLowerCase() === device.trim().replace(' ', '').toLowerCase())
    }

    onPhoneClick = (ph) => {
        this.setState({chousedPhone: ph});
        this.getPhoneData(ph.phone);
    }

    onBookPhone = (name) => {
        const {chousedPhone} = this.state;
        const data = {
            ...chousedPhone,
            bookedBy: name,
            date: +new Date(),
            status: !chousedPhone.status
        };
        this.setState({chousedPhone: data}, async () => {
            ServerApiHelper.patch(`/phones/${chousedPhone.id}`, data).then(({data}) => {
                const {phones} = this.state;
                const updatedPhones = phones.map((phone) => phone.id === data.id ? data : phone);
                this.setState({chousedPhone: null, phones: updatedPhones});
            });
        });
    }


    render() {
        const {chousedPhone, phones, phoneInfo} = this.state;
        return (
            <Wrapper>
                {chousedPhone != null ? <PhoneInfoComponent phoneInfo={phoneInfo}
                                                            onBookPhone={this.onBookPhone}
                                                            chousedPhone={chousedPhone}/> : null}
                <PhoneListComponent phones={phones} onPhoneClick={this.onPhoneClick}/>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
  background-color: #455984;
  height: 100vh;
  width: 100vw;
`;

export default ServerAppContainer;
