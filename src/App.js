import React, { Component } from 'react';
import { PhoneInfoHelper } from './helpers/PhoneInfoHelper';
import { ACCESS_FIREBASE, ACCESS_FONOAPI_TOKEN } from './config/access-configs';
import styled from 'styled-components';
import { RDatabaseService } from './services/RDatabaseService';
import { PhoneListComponent } from './components/PhonesListComponent';
import { PhoneInfoComponent } from './components/PhoneInfoComponent';

class App extends Component {
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
        this.phoneStore = new RDatabaseService();
        this.phoneStore.getCollectionData('phones', (snapQuery) => {
            const toolsList = snapQuery.docs.map(documentSnapshot => {
                return {
                    id: documentSnapshot.id,
                    ...documentSnapshot.data()
                }
            });
            this.setState({phones: toolsList})
        }, (error) => {
            console.warn('Error', error);
        });
    }

    async getPhoneData(device, id) {
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
        this.setState({chousedPhone: ph})
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
        this.setState({chousedPhone: data}, () => {
            this.phoneStore.updateCollectionData('phones', chousedPhone.id, data);
            this.setState({chousedPhone: null});
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

export default App;
