const check = (str, bracketsConfig) => {
    const config = new BracketConfig(bracketsConfig);
    return config.isValid(str);
};

class Bracket {
    constructor(char, isOpened, group, isDual) {
        this.char = char;
        this.isOpened = isOpened;
        this.group = group;
        this.isDual = isDual;
    }
}

class BracketConfig {
    constructor(config) {
        this.brackets = [];
        config.forEach((group, index) => {
            if (group[0] === group[1]) {
                this.brackets.push(new Bracket(group[0], false, index, true));
            } else {
                this.brackets.push(new Bracket(group[0], true, index, false));
                this.brackets.push(new Bracket(group[1], false, index, false));
            }
        });
    }

    getBracket(char) {
        return this.brackets.find((bracket) => bracket.char === char);
    }

    isValid(str) {
        const openedBrackets = [];
        const charArray = str.split("");
        for (const char of charArray) {
            const currentBracket = this.getBracket(char);
            if (!currentBracket) {
                return false;
            }

            if (currentBracket.isDual) {
                if (openedBrackets.length > 0) {
                    const lastOpenedBracket =
                        openedBrackets[openedBrackets.length - 1];
                    if (lastOpenedBracket === currentBracket) {
                        openedBrackets.pop();
                    } else {
                        openedBrackets.push(currentBracket);
                    }
                } else {
                    openedBrackets.push(currentBracket);
                }
            } else if (currentBracket.isOpened) {
                openedBrackets.push(currentBracket);
            } else {
                const openedBracket = openedBrackets.pop();
                if (
                    !openedBracket ||
                    openedBracket.group !== currentBracket.group
                ) {
                    return false;
                }
            }
        }

        return openedBrackets.length === 0;
    }
}

module.exports = check;
