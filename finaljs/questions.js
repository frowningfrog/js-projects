export const cquestions = [
    {
        question: (cob) => `What is the hit die of a ${cob.name}?`,

        answer: (cob) => cob.hit_die,
    },
    {
        question: (cob) => `What is a subclass of a ${cob.name}?`,

        answer: (cob, sub) => cob.subclasses.length > 0 ? cob.subclasses[sub].name : 'No subclasses',
    },
    {
        question: (cob) => `What is a feature of a ${cob.name}?`,
        
        answer: ({levels}, lev, fea) => levels[lev].features[fea].name,
    }
];