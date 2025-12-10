function getRandomHexColor() {
    // Generate a random integer between 0 and 16777215 (which is FFFFFF in hex)
    const randomInt = Math.floor(Math.random() * 16777215);

    // Convert the integer to a hexadecimal string
    let hex = randomInt.toString(16);

    // Pad the hex string with leading zeros if necessary (ensuring 6 characters)
    // For example, if the hex is 'A3B', it becomes '000A3B'
    return '#' + hex.padStart(6, '0');
}