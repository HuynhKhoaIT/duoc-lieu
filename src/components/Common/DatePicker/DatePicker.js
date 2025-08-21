import classNames from 'classnames';
import Picker from 'rc-picker';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import viVN from 'rc-picker/lib/locale/vi_VN';

import ClearIcon from '@/assets/icons/clear-icon.svg';
import ScheduleTestIcon from '@/assets/icons/schedule-test.svg';

import 'rc-picker/assets/index.css';
import styles from './DatePicker.module.scss';

const DatePicker = ({
    className,
    dropdownClassName,
    date,
    picker = undefined,
    showToday = false,
    allowClear = false,
    locale = viVN,
    onChange,
    inputReadOnly = true,
    getPopupContainer,
    suffixIcon,
    value,
    label,
    error,
    ...props
}) => {
    const onSelect = (newValue) => {
        // console.log("Select:", newValue);
    };
    const pickerDate = [ 'time', 'date', 'month', 'year', 'timeShort', 'week' ].includes(picker) ? picker : undefined;
    const formatConfig = (picker) => {
        if (!picker) return { undefined: 'DD/MM/YYYY HH:mm:ss' };
        return {
            time: 'HH:mm',
            timeShort: 'HH:mm',
            date: 'DD/MM/YYYY',
            month: 'MM/YYYY',
            year: 'YYYY',
            week: 'Wo/YYYY',
        };
    };

    const renderPickers = (picker) => {
        if (!picker) return 'date';
        return {
            time: 'time',
            timeShort: 'time',
            date: 'date',
            month: 'month',
            year: 'year',
            week: 'week',
        };
    };

    const format = formatConfig(pickerDate)[pickerDate];
    const pickerConfig = renderPickers(pickerDate)[pickerDate];
    const localeObject = {
        ...locale,
        shortMonths: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
        ],
        shortWeekDays: [ 'CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7' ],
    };
    const sharedProps = {
        ...props,
        generateConfig: dayjsGenerateConfig,
        value: date,
        onChange,
        onSelect,
    };
    pickerDate && (sharedProps.picker = pickerDate);
    pickerDate === undefined && (sharedProps.showTime = true);

    return (
        <Picker
            {...sharedProps}
            locale={localeObject}
            format={format}
            picker={pickerConfig}
            className={classNames(styles.boxTimer, className, {
                [styles.inputDefault]: true,
                [styles.inputShowMonth]: pickerDate === 'month',
                [styles.inputShowDateOrTime]: [ 'date', 'time' ].includes(pickerDate),
                [styles.inputShowDateTime]: !pickerDate,
                [styles.error]: error,
            })}
            suffixIcon={suffixIcon ? suffixIcon : <ScheduleTestIcon />}
            dropdownClassName={classNames(styles.dropdownPicker, dropdownClassName)}
            superPrevIcon={<span className={classNames(styles.superIcon, styles.superPrevIcon)}></span>}
            superNextIcon={<span className={classNames(styles.superIcon, styles.superNextIcon)}></span>}
            prevIcon={<span className={classNames(styles.icon, styles.prevIcon)}></span>}
            nextIcon={<span className={classNames(styles.icon, styles.nextIcon)}></span>}
            showToday
            showNow
            value={value}
            allowClear={allowClear ? { clearIcon: <ClearIcon /> } : allowClear}
            inputReadOnly={inputReadOnly}
            getPopupContainer={getPopupContainer ?? ((trigger) => trigger.parentElement)}
        />
    );
};

export default DatePicker;
