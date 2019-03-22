import firebase from 'firebase/app';
import 'firebase/firestore';
import { ACCESS_FIREBASE } from '../config/access-configs';

export class RDatabaseService {
    constructor(){
        if (!firebase.apps.length) {
            firebase.initializeApp(ACCESS_FIREBASE);
        }

        this.database = firebase.firestore();
    }

    getCollectionData(collection, successCallback, errorCallback) {
        this.database.collection(collection).onSnapshot(successCallback, errorCallback);
    }

    updateCollectionData(collection, docId, data) {
        return this.database.collection(collection).doc(docId).set(data);
    }
}