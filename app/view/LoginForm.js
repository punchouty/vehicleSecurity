
Ext.define('GpsTracker.view.LoginForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.loginForm',
    xtype: 'loginForm',

    requires: [
        'Ext.TitleBar',
        'Ext.field.Text',
        'Ext.Button',
        'Ext.form.FieldSet',
        'Ext.form.Email',
        'Ext.field.Password'
    ],

    config: {
        cls: 'form-bg',
        items: [{
            xtype: 'fieldset',
            title: 'Login',
            items: [{
                name: 'login',
                xtype: 'textfield',
                label: 'Email or Username*',
                placeHolder: 'user or user@example.com',
                itemId: 'loginScreenEmail'
            }, {
                name: 'password',
                xtype: 'passwordfield',
                label: 'Password*',
                placeHolder: 'Password',
                itemId: 'loginScreenPassword'
            }]
        }, {
            xtype: 'button',
            itemId: 'loginButton',
            margin: 20,
            padding: 8,
            text: 'Login',
            ui: 'action'
        }]
    }

});