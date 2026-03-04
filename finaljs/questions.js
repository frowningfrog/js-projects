export const cquestions = [
    {
        question: (classname) => `What is the hit die of a ${classname.name}?`,
        answer: (classname) => classname.hit_die,
    },
    {
        question: (classname) => `What is a subclass of a ${classname.name}?`,
        answer: (classname, num) => classname.subclasses.length > 0 ? classname.subclasses[num].name : "No subclasses",
    },
];