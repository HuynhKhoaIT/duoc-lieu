import { FormItem } from "../Form";

import Input from ".";

function InputField({
    name = "",
    rules = [],
    label = "",
    required = false,
    placeholder = "",
    requireMessage = "",
    fieldProps,
    disabled = false,
    type = "text",
    onChange,
    ...props
}) {
    return (
        <FormItem
            {...props}
            required={required}
            name={name}
            rules={rules}
            label={label}
            placeholder={placeholder}
            requireMessage={requireMessage}
        >
            <Input onChange={onChange} disabled={disabled} type={type} {...fieldProps} />
        </FormItem>
    );
}

export default InputField;
