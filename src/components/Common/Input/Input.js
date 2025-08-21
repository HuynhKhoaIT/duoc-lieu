import cls from 'classnames';
import { isNull } from 'lodash';

import useUncontrolled from '@/hooks/useUncontrolled';
import { exceptNumberSymbols } from '@/utils/common';
import { extractStyleProps } from '@/utils/extract-style-props';

import Box from '../Box';

import styles from './Input.module.scss';

function Input({
    disabled = false,
    error,
    id,
    leftSection,
    leftSectionWidth,
    leftSectionPointerEvents = 'none',
    rightSection,
    rightSectionWidth,
    rightSectionPointerEvents = 'none',
    placeholder = '',
    label = '',
    className,
    classNames = {},
    variant = 'default',
    value,
    innerRef,
    onChange,
    type = 'text',
    onlyDigit = false,
    ...props
}) {
    const { styleProps, rest } = extractStyleProps(props);
    const [_value, _onChange] = useUncontrolled({
        value: isNull(value) ? '' : value,
        onChange,
        defaultValue: '',
    });

    return (
        <Box
            {...styleProps}
            data-with-left-section={!!leftSection}
            data-with-right-section={!!rightSection}
            data-variant={variant}
            style={{
                '--input-left-section-width': leftSectionWidth,
                '--input-right-section-width': rightSectionWidth,
                '--input-left-section-pointer-events': leftSectionPointerEvents,
                '--input-right-section-pointer-events':
                    rightSectionPointerEvents,
            }}
            className={cls(className, classNames?.wrapper, styles.wrapper)}
            title={label || placeholder}
        >
            {leftSection && (
                <div
                    data-position="left"
                    className={cls(classNames?.section, styles.section)}
                >
                    {leftSection}
                </div>
            )}
            <input
                onKeyDown={(e) => {
                    onlyDigit && exceptNumberSymbols(e);
                }}
                {...rest}
                tabIndex={0}
                ref={innerRef}
                data-error={!!error}
                data-label={!!label}
                data-has-value={value != undefined && value !== ''}
                className={cls(classNames?.input, styles.input)}
                placeholder={label ? '' : placeholder}
                id={id}
                disabled={disabled}
                type={type}
                inputMode={type === 'number' ? 'numeric' : undefined}
                value={_value}
                onChange={_onChange}
            />
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}
            {rightSection && (
                <div
                    data-position="right"
                    className={cls(classNames?.section, styles.section)}
                >
                    {rightSection}
                </div>
            )}
        </Box>
    );
}

export default Input;
