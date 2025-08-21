import React from 'react';

import Form from './Form';

function FormItem({ children, required, rules = [], name, label, placeholder, requireMessage, ...props }) {
    const _rules = rules || [];
    const _label = label || placeholder || '';

    if (required) {
        _rules.push({
            required: true,
            message: requireMessage || `${_label} không được bỏ trống`,
        });
    }
    return (
        <Form.Item {...props} name={name} rules={_rules}>
            {React.cloneElement(children, { label, placeholder })}
        </Form.Item>
    );
}

export default FormItem;
