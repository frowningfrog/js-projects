let control = 'Playing:';

function render(control) {
    let btn = '';
    document.getElementById('title').innerText = `${coolsongs.current.data}`;
    document.getElementById('status').innerText = control;
    if(control === 'Playing:') {
        btn = 'Pause';
    } else {
        btn = 'Play';
    }
    document.getElementById('control').innerText = btn;
}

class Node {
    constructor(thing){
        this.data = thing;
        this.next = null;
        this.prev = null;
    }
}

class playlist {
    constructor(){
        this.head = null;
        this.tail = null;
    }

    addItem(song) {
        const newNode = new Node(song);

        if(this.head === null){
            this.head = newNode;
            this.tail = newNode;
            this.current = this.head;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = this.tail.next;
            this.head.prev = this.tail;
            this.tail.next = this.head;
        }
    }

    next() {
        this.current = this.current.next;
    }

    prev() {
        this.current = this.current.prev;
    }
}

const coolsongs = new playlist();
coolsongs.addItem(`Derezzed`);
coolsongs.addItem(`Harder Better Faster Stronger`);
coolsongs.addItem(`Fireflies`);
coolsongs.addItem(`Vanilla Twilight`);

render(control);

document.getElementById('control').addEventListener('click', () => {
    if(control === 'Playing:') {
        control = 'Paused:';
    } else {
        control = 'Playing:';
    }
    render(control);
});

document.getElementById('next').addEventListener('click', () => {
    coolsongs.next();
    render(control);
});

document.getElementById('prev').addEventListener('click', () => {
    coolsongs.prev();
    render(control);
});