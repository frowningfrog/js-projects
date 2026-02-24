document.getElementById('status').innerText = 'greetings';
document.getElementById('title').innerText = 'programs';

class Node {
    constructor(data){
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class playlist {
    constructor(){
        this.head = null;
        this.tail = null;
    }

    append(data){
        const newNode = new Node(data);

        if(this.head === null){
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }
}

const coolsongs = new playlist();
coolsongs.append(`Derezzed`);
coolsongs.append(`Harder Better Faster Stronger`);

console.log(coolsongs);