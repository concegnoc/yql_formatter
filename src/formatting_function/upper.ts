import { keywords, builtinFunctions } from '../keywords';

const kw = keywords.concat(builtinFunctions);

interface Dictionary {
    [key: string]: string;
}

const forg_dict: Dictionary = {
    "\"":"\"",
    "'":"'",
    "`":"`",
    "--":"\n",
    "/*":"*/",
}
;

function special_split(text: string) {
    let arr = [];
    let left = 0;
    let right = -1;
	
    while (right < text.length) {
        right ++;
        //run before meet sign from forg_dict, then add part before and start new part
        let elem = "";
        if (Object.keys(forg_dict).includes(text.slice(right, right+1))) {
            elem = text.slice(right, right+1);
        } else if (Object.keys(forg_dict).includes(text.slice(right, right+2))) {
            elem = text.slice(right, right+2);
        }

        if (elem !== "") { 
            arr.push(["", text.slice(left, right)]);
            left = right;
            right ++;
            while (right < text.length && text.slice(right, right+forg_dict[elem].length) !== forg_dict[elem]) {
                right ++;
            }
            arr.push([elem, text.slice(left+elem.length, right)]);
            left = right+forg_dict[elem].length;
        }
    }

    arr.push(["", text.slice(left, right)]);

    return arr;
}
;

function keywords_to_upper(text: string) {
    // split by forg_dict
    let parts = special_split(text);
    let new_parts = [];

    // format only parts not in forg_dict
    for (let index = 0; index < parts.length; index++) {
        if (!Object.keys(forg_dict).includes(parts[index][0])) {
            let part = " " + parts[index][1] + " ";
            for (let jndex = 0; jndex < kw.length; jndex++) {
                let pattern = new RegExp(`(?<=[ |\n|;|\(|\)])(${kw[jndex]})(?=[ |\n|;|\(|\)])`, 'ig');
                part = part.replace(pattern, kw[jndex].toUpperCase());
            };
            new_parts.push(part.slice(1, part.length-1));
        } else {
            new_parts.push(parts[index][0] + parts[index][1] + forg_dict[parts[index][0]]);
        };
    };
    
    //join array
    return new_parts.join("");
}

export { keywords_to_upper };