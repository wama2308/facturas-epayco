export const amountFormat = (amount, decimals) => {
    amount += ""; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, "")); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0) return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = "" + amount.toFixed(decimals);

    let amount_parts = amount.split("."),
        regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, "$1" + "," + "$2");

    return amount_parts.join(",");
}

export const convertDate = (date) => {
    let milliseconds = date * 1000;
    let dateConvert = new Date(milliseconds);
    var dateResult = dateConvert.getFullYear() + "-" + ("0" + (dateConvert.getMonth() + 1)).slice(-2) + "-" + ("0" + dateConvert.getDate()).slice(-2) + " " +
        ("0" + dateConvert.getHours()).slice(-2) + ":" + ("0" + dateConvert.getMinutes()).slice(-2) + ":" + ("0" + dateConvert.getSeconds()).slice(-2);
    return dateResult;
}

export const searchKey = (array, key) => {
    return array.find(dataConfig => dataConfig.key === key).name;
}