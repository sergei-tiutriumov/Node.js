if (process.argv.length <3) {
    console.error('Укажите величину в дюймах');
    process.exit(1);
}
const inches = parseFloat(process.argv[2]);
if (!inches) {
    console.error('Input a number');
    process.exit(1);
}
const centimetres = inches * 2.54;
console.log(`${inches} дюймов>>> ${centimetres} sm.`);
