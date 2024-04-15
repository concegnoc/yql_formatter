function set_indents_select(text: string, start_indent=0) {
    let new_text = "";
    return new_text;
}

function set_indents(text: string) {
    let parts = text.split(";").map(x => x.trim());


    for (let index=0; index<parts.length; index++) {
        //search select
        if (parts[index].slice(0, 7) === "SELECT ") {
            let new_text = set_indents_select(parts[index]) + "\n;";
        } else if (parts[index][0] === "$" && parts[index].match("SELECT ")) {
            text.replace(/ *= *\(*SELECT /, " = (\n\tSELECT ");
        }
    }
}

export { set_indents };