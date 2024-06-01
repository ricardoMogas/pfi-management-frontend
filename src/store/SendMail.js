import emailjs from '@emailjs/browser';

export const SendMail = (toName, message, setLoading) => {
    setLoading(true);

    const templateParams = {
        from_name: 'MASO Management System - PFI',
        to_name: toName,
        message: message,
    };

    emailjs.send('default_service', 'template_bbwaz6a', templateParams, 'I2ZQG3GgCdtHzjMg7')
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            setLoading(false);
        }, (err) => {
            console.log('FAILED...', err);
            setLoading(false);
            alert('Failed to send message. Please try again.');
        });
};

export const SendMailEvery = (toName, emailUser, message, setLoading ) => {
    setLoading(true);

    const templateParams = {
        from_name: 'MASO Management System - PFI',
        from_name: 'Notificación de MASO Management System - PFI',
        to_email: emailUser,
        to_name: toName,
        message: message,
    };

    emailjs.send('default_service', 'template_flrj3sm', templateParams, 'I2ZQG3GgCdtHzjMg7')
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Mensaje enviado!');
            setLoading(false);
            return true;
        }, (err) => {
            console.log('FAILED...', err);
            setLoading(false);
            alert('Failed to send message. Please try again.');
            return false;
        });
};
