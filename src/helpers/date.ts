import { DateObjectUnits, DateTime } from 'luxon'

class DateTimeExtension {

    static format = 'yyyy-MM-dd'

    static tomorrow(): DateTime {
        return DateTime.utc().plus({day: 1})
    }

    static yesterday(): DateTime {
        return DateTime.utc().minus({day: 1})
    }

    static getDayOfWeek(date: DateTime): tDay {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

        return days[date.day] as tDay
    }

    static getDateFormat(values?: DateObjectUnits): string {
        const date = DateTime.local()
        return date.set({
            year: values?.year || date.year,
            month: values?.month || date.month,
            day: values?.day || date.day
        }).toFormat(this.format)
    }

    static getDateInFormat(year?: number, month?: number, day?: number): string {
        const date = DateTime.local()
        return date.set({year: year, month: month, day: day})
            .toFormat(this.format)
    }

    static getDateWithOffsetInYear(offset: number): string {
        const date = DateTime.local()
        return date.plus({year: offset})
            .toFormat(this.format)
    }

    static getDateTimeISO(values?: DateObjectUnits): string {
        const dateTime = DateTime.utc().set({millisecond: 0})
        return dateTime.plus({
            year: values?.year,
            month: values?.month,
            day: values?.day,
            hour: values?.hour,
            minute: values?.minute
        }).toISO().replace('.000Z', '+00:00')
    }

    static getDateFormatISO(date: string): string {
        return `${date}T00:00:00+00:00`
    }

    static getDateTimeCode(): string {
        return DateTime.utc().toFormat('mm/dd/yyyy hh:mm:ss')
    }

    static getDateTimeCodeWithOffset(offset?: number): string {
        const date = DateTime.utc()
        return date.plus({second: offset}).toFormat('MM/dd/yyyy HH:mm:ss')
    }

}

type tDay = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

const dateTime = DateTimeExtension
export default dateTime
