
class Utils {
    ActualDate() {
        const fechaActual = new Date();
        const dia = fechaActual.getDate().toString().padStart(2, '0');
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaActual.getFullYear().toString();
        return `${anio}-${mes}-${dia}`;
    };
    truncateText(text, maxLength){
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    correctKeys(data){
        return data.map(item => {
            return Object.keys(item).reduce((acc, key) => {
                const newKey = key.replace(/\s+/g, '_'); // Reemplazar espacios por guiones bajos
                acc[newKey] = item[key];
                return acc;
            }, {});
        });
    };
}

export default new Utils();