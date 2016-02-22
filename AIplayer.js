function AIPlayer(name, boardData) {
    var self = this;
    this.name = name;
    this.boardData = boardData;
    this.turn = function () {
        //var blocked = getBlockedAnswers();
        var bestAnswers = getBestPossiblePatterns();
        //console.log(bestAnswers);
        var topAnswers = [];
        //console.log("bestAnswers", bestAnswers);
        for(var i = 0; i < bestAnswers.length; i += 1) {
            if(bestAnswers[i] && bestAnswers[i].count === bestAnswers[0].count) {
                topAnswers.push(bestAnswers[i].index);
            }
        }
        //console.log("topAnswers", topAnswers, "count", bestAnswers[0].count);
        var randomIndex = Math.floor(Math.random() * topAnswers.length);
        this.select(topAnswers[randomIndex]);
    };

    function getBestPossiblePatterns() {
        var possibleIndexes = [];
        // loop through all indexes and check their possibilities, and add them to possibleIndexes.
        var value;
        for (var i = 0; i < boardData.length; i += 1) {
            if (!boardData[i]) {
                value = {index:i, count:0};
                if(isWinAvailable(i)) {
                    //console.log('Add WinAvailable at %s', i);
                    value.count += 4;
                } else if(needsBlocked(i)) {
                    //console.log('Add needsBlocked at %s', i);
                    value.count += 3;
                } else {
                    //console.log('else at %s', i);
                    value.count += getPossibilitiesForIndex(i);
                }
                //console.log("\t" + JSON.stringify(value));
                possibleIndexes[i] = value;
            }
        }
        possibleIndexes.sort(compare);
        // then any that are used by the other player, we take out.
        return possibleIndexes;
    }

    function getPossibilitiesForIndex(index) {
        // loop through and if the answer has this index add 1.
        var count = 0;
        var a;
        for (var i = 0; i < self.answers.length; i += 1) {
            a = self.answers[i];
            if (a.indexOf(index) !== -1) {
                if ((boardData[a[0]] === 0 || boardData[a[0]] === name)
                    && (boardData[a[1]] === 0 || boardData[a[1]] === name)
                    && (boardData[a[2]] === 0 || boardData[a[2]] === name)) {
                    count += 1;
                }
            }
        }
        return count;// return the total count.
    }

    function compare(a, b) {
        if(a.count > b.count) {
            return -1;
        }
        if(a.count < b.count) {
            return 1;
        }
        return 0;
    }

    function needsBlocked(index) {
        var a, count, a1, a2, a3;
        for(var i = 0; i < self.answers.length; i += 1) {
            a = self.answers[i];
            count = 0;
            if (a.indexOf(index) !== -1) {
                a1 = boardData[a[0]];
                a2 = boardData[a[1]];
                a3 = boardData[a[2]];
                count += a1 && a1 !== name ? 1 : 0;
                count += a2 && a2 !== name ? 1 : 0;
                count += a3 && a3 !== name ? 1 : 0;
                if(count === 2) {
                    //console.log("\tneedsBlocked %s count %s at %s", a, count, index);
                    return true;
                }
            }
        }
        return false;
    }
    function isWinAvailable(index) {
        var a, count, a1, a2, a3;
        for(var i = 0; i < self.answers.length; i += 1) {
            a = self.answers[i];
            count = 0;
            if (a.indexOf(index) !== -1) {
                a1 = boardData[a[0]];
                a2 = boardData[a[1]];
                a3 = boardData[a[2]];
                count += a1 && a1 === name ? 1 : 0;
                count += a2 && a2 === name ? 1 : 0;
                count += a3 && a3 === name ? 1 : 0;
                if(count === 2) {
                    //console.log("\tisWinAvailable %s count %s at %s",a, count, index);
                    return true;
                }
            }
        }
        return false;
    }
}
AIPlayer.prototype = new Player();
