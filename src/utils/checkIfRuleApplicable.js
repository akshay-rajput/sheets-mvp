// function to check if a rule returns true for a given value
function checkIfRuleApplicable(rules, cellValue, columnName){
    let colorOfCell = "";
    
    // for edge case of column name having spaces or capital letters
    columnName = columnName.split(" ").join("").toLowerCase();

    rules.forEach(rule => {

        if(columnName == rule.fieldName){
            switch (rule.condition) {
                case "gt":
                    if(cellValue > rule.value){
                        colorOfCell = rule.color;
                    }
                    break;
                case "gte":
                    if(cellValue >= rule.value){
                        colorOfCell = rule.color;
                    }
                    break;
                case "lt":
                    if(cellValue < rule.value){
                        colorOfCell = rule.color;
                    }
                    break;
                case "lte":
                    if(cellValue <= rule.value){
                        colorOfCell = rule.color;
                    }
                    break;
                case "eq":
                    if(cellValue == rule.value){
                        colorOfCell = rule.color;
                    }
                    break;
                default:
                    break;
            }
        }
    })

    // console.log("color: ", colorOfCell);
    if(colorOfCell){
        // console.log("found: ", cellValue);
        return colorOfCell;
    }
    return false;
}

export default checkIfRuleApplicable;