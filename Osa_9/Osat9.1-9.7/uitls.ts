

//Is passed argument a valid number
export const isNumber = (argument: any[]): boolean => {
    for (const number of argument) {
        if (isNaN(Number(number))) {
            throw new Error('Provided arguments are not all numbers')
        }
    }
    return true
}

export const isLengthCorrect = (argument: any[], targetLength?: number): boolean => {
    if (argument.length === targetLength && argument.length > 0)
        return true;
    else{
        throw new Error('incorrect input length');
    }


}
