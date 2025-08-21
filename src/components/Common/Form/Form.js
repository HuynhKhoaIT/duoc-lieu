import React, { useContext } from "react";
import cls from "classnames";
import { default as RcForm, Field, FieldContext } from "rc-field-form";

import styles from "./Form.module.scss";

function Item({ name = "", children, className, classNames = {}, style, ...props }) {
    return (
        <Field name={name} {...props}>
            {(control, meta, form) => {
                const child =
                    typeof children === "function"
                        ? children(control, meta, form)
                        : React.cloneElement(children, {
                            ...control,
                            onChange: (e) => {
                                control.onChange(e);
                                children.props.onChange?.(e);
                            },
                            error: !!meta.errors.length,
                        });

                return (
                    <div style={style} className={cls(styles.field, className, classNames.root)}>
                        {child}
                        {!!meta.errors.length && (
                            <div className={cls(styles.errors, classNames.errors)}>
                                {React.Children.map(meta.errors, (error) => (
                                    <div className={cls(styles.error, classNames.error)}>
                                        {error}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }}
        </Field>
    );
}

export const useFormInstance = () => {
    const ctx = useContext(FieldContext);

    return ctx;
};

const Form = RcForm;

Object.assign(Form, {
    Item,
});

export default Form;
