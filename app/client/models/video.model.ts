import {FirebaseService} from '../services/firebase.service.ts';
const Firebase = require('firebase');
const videosPath = 'videos/';
const save = async (id, data) => {
    if (id) {
        const path = videosPath + id;
        await FirebaseService.set(path, data);
        return id;
    }
    else {
        const timestampEnabledData = Object.assign({}, data, {
            timestamp: Firebase.ServerValue.TIMESTAMP
        });
        const path = videosPath;
        return await FirebaseService.push(path, timestampEnabledData);
    }
};
const getById = async (id) => {
    const path = videosPath + id;
    const problem = await FirebaseService.get(path);
    return problem;
};
export const VideoModel = {
    save,
    getById
};
