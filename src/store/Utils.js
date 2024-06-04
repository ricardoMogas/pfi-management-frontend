class Utils {
    ActualDate() {
        const fechaActual = new Date();
        const dia = fechaActual.getDate().toString().padStart(2, '0');
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaActual.getFullYear().toString();
        return `${anio}-${mes}-${dia}`;
    };

    ActualDateTime() {
        const fechaActual = new Date();
        const dia = fechaActual.getDate().toString().padStart(2, '0');
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaActual.getFullYear().toString();
        const hora = fechaActual.getHours().toString().padStart(2, '0');
        const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
        const segundos = fechaActual.getSeconds().toString().padStart(2, '0');
        const milisegundos = fechaActual.getMilliseconds().toString().padStart(6, '0');
        return `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}.${milisegundos}`;
    };

    truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    correctKeys(data) {
        return data.map(item => {
            return Object.keys(item).reduce((acc, key) => {
                const newKey = key.replace(/\s+/g, '_'); // Reemplazar espacios por guiones bajos
                acc[newKey] = item[key];
                return acc;
            }, {});
        });
    };

    excelDateToJSDate(serial) {
        const serialNumber = parseFloat(serial);
        const date = new Date(Math.floor((serialNumber - 25569) * 86400 * 1000));
        return date;
    };
}

export default new Utils();
