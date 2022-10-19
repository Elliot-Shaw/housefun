let loop = (number) => {
    number = number -1;
    for (let i = 0; i <= number%8; i++){
        console.log(i);
    }
}

loop(8);