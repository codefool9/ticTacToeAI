function Player(name, boardData) {
    this.name = name;
    this.boardData = boardData;
    this.answers = [
        "012",
        "345",
        "678",
        "036",
        "147",
        "258",
        "048",
        "246"
    ];

    this.select = function (index) {
        this.boardData[index] = this.name;
        var el = board.children[index];
        if(el) {
            el.classList.add(this.name);
        }
    }
}