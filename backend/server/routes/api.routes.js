var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();



module.exports = function (app, socket) {

    var controller = require('../api/pdf_template.controller');
    controller.setSocket(socket);
    // Post Methods
    app.post('/api/settings/upload-template-pdf', multipartyMiddleware, controller.process_template);
    app.post('/api/settings/save-template-data', controller.save_template_data);
    app.post('/api/settings/save-field/:template_id', controller.save_field);


    app.post('/api/pdf/process', multipartyMiddleware, controller.process);

    // Get Methods
    app.get('/api/settings/get-templates', controller.get_templates);
    app.get('/api/settings/get-template/:id', controller.get_one_template);
    app.get('/api/settings/get-fields/:template_id', controller.get_fields);

};