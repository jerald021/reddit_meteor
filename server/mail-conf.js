Meteor.startup(function() {
    //-- Configuración del smtp (settings.json)
    smtp = {
        username: Meteor.settings.private.username,
        password: Meteor.settings.private.password,
        server: Meteor.settings.private.server,
        port: Meteor.settings.private.port
    };

    //-- Variable de entorno
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    //-- Email del emisor
    Accounts.emailTemplates.from = smtp.username;

    //-- Nombre del sitio o aplicación
    Accounts.emailTemplates.siteName = 'Reddit';

    //-- Asunto del email
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
        return 'Reddit Confirmación de email';
    };

    //-- Contenido del email
    Accounts.emailTemplates.verifyEmail.text = function(user, url) {
        return 'Gracias por registrarte.  Por favor haz click en el siguiente enlace para confirmar tu email \r\n' + url;
    };

    //-- Después de crear un usuario se envia un email
    Accounts.config({
        sendVerificationEmail: true
    });
});