"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keywords_to_upper = void 0;
const keywords_1 = require("../keywords");
function special_split(text) {
    let arr = [];
    let current = "";
    let left = -1;
    let right = -1;
    while (right < text.length) {
        right++;
        //run before meet ', ", `, then add part before and start new part
        if (['"', "'", "`"].includes(text[right])) {
            if (current == "") {
                current = text[right];
                arr.push(text.slice(left + 1, right));
                left = right;
            }
            else if (text[right] == current) {
                current = "";
                arr.push(text[right] + text.slice(left + 1, right) + text[right]);
                left = right;
            }
        }
    }
    // add last part
    arr.push(text[right] + text.slice(left + 1, right) + text[right]);
    return arr;
}
;
function keywords_to_upper(text) {
    // split by ', ", `
    let parts = special_split(text);
    // format only parts not in ', ", `
    for (let index = 0; index < parts.length; index++) {
        if (!["--", "/*", '"', "'", "`"].includes(parts[index].slice(0, 2))) {
            let part = " " + parts[index];
            for (let jndex = 0; jndex < keywords_1.keywords.length; jndex++) {
                let pattern = new RegExp(`(?<=[ |\n|;|\(|\)])(${keywords_1.keywords[jndex]})(?=[ |\n|;|\(|\)])`, 'ig');
                part = part.replace(pattern, keywords_1.keywords[jndex].toUpperCase());
            }
            ;
            parts[index] = part.slice(1, part.length);
        }
        ;
    }
    ;
    //join array
    return parts.join("");
}
exports.keywords_to_upper = keywords_to_upper;
//# sourceMappingURL=uppers.js.map