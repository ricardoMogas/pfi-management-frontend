import emailjs from '@emailjs/browser';
import showAlert from './SimpleAlert';
export const SendMail = (toName, message, setLoading) => {
    setLoading(true);

    const templateParams = {
        from_name: 'MASO Management System - PFI',
        to_name: toName,
        message: message,
    };

    emailjs.send('service_1stk3bi', 'template_r6762on', templateParams, 'KLyjHkAjTrQx_XHBc')
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            showAlert('success', 'El correo ha sido enviado correctamente.');
            setLoading(false);
        }, (err) => {
            console.log('FAILED...', err);
            showAlert('error', 'Ocurrió un problema al enviar el correo.');
            setLoading(false);
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

    emailjs.send('service_1stk3bi', 'template_ldgf3hj', templateParams, "KLyjHkAjTrQx_XHBc")
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            showAlert('success', 'El correo ha sido enviado correctamente.');
            setLoading(false);
            return true;
        }, (err) => {
            console.log('FAILED...', err);
            showAlert('error', 'Ocurrió un problema al enviar el correo.');
            setLoading(false);
            return false;
        });
};
