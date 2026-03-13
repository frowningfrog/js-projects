const vows = ['a', 'e', 'i', 'o', 'u'];

export const cquestions = [
    {
        question: (cob) => `What is the hit die of a ${cob.name}?`,

        answer: (cob) => cob.hit_die
    },
    {
        question: (cob) => `What is a subclass of a ${cob.name}?`,

        answer: (cob, sub) => cob.subclasses[sub].name
    },
    {
        question: (cob) => `What is a feature of a ${cob.name}?`,
        
        answer: ({levels}, lev, fea) => levels[lev].features[fea].name
    }
];

export const mquestions = [
    {
        question: (mob) => `What is the hp of a` + (vows.includes(mob.name[0].toLowerCase()) ? `n` : ``) + ` ${mob.name}?`,

        answer: (mob) => mob.hit_points
    },
    {
        question: (mob) => `What is the type of a` + (vows.includes(mob.name[0].toLowerCase()) ? `n` : ``) + ` ${mob.name}?`,

        answer: (mob) => mob.type
    }
];