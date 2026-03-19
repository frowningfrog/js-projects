document.getElementById('status').innerText = 'Playing:';

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
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = this.tail.next;
            this.head.prev = this.tail;
            this.tail.next = this.head;
        }
    }
}

const coolsongs = new playlist();
coolsongs.addItem(`Derezzed`);
coolsongs.addItem(`Harder Better Faster Stronger`);
coolsongs.addItem(`Fireflies`);
coolsongs.addItem(`Vanilla Twilight`);

document.getElementById('title').innerText = `${coolsongs.head.data}`;