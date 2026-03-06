export const cquestions = [
    {
        question: ({classInfo}) => `What is the hit die of a ${classInfo.name}?`,

        answer: ({classInfo}) => classInfo.hit_die,
    },
    {
        question: ({classInfo}) => `What is a subclass of a ${classInfo.name}?`,

        answer: ({classInfo}, sub) => classInfo.subclasses.length > 0 ? classInfo.subclasses[sub].name : 'No subclasses',
    },
    {
        question: ({classInfo}) => `What is a feature of a ${classInfo.name}?`,
        
        answer: ({levels}, lev, fea) => levels[lev].features[fea].name
    }
];