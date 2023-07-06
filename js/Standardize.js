function standardizeName(str) {
    str = str.trim().replace(/\s+/g, ' ');
    str = str.split(' ');
        for (let i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1) ;
        }
    str = str.join(' ')
    return str;
}