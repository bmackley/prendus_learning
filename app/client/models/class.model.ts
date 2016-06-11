import FirebaseService from '../firebase/firebase.ts'
const classPath = 'class/';
const save = async (id, data) => {
    if (id) {
        const path = classPath + id;
        await FirebaseService.set(path, data);
        return id;
    }
    else {
        const timestampEnabledData = Object.assign({}, data, {
            timestamp: Firebase.ServerValue.TIMESTAMP
        });
        const path = classPath;
        return await FirebaseService.push(path, timestampEnabledData);
    }
};
const getById = async (id) => {
    const path = classPath + id;
    const problem = await FirebaseService.get(path);
    console.log(problem)
    return problem;
};
const orderConcepts = async (id) => {

};

export const ClassModel = {
    save,
    getById,
    orderConcepts,
}
