import dateHelper from '../../../helpers/date'
import { generateTimeSuffix } from '@helpers/generate.helpers'
import dateTime from '../../../helpers/date'
import { iCareer } from '../../../api/rsv-profile/career/career.types'

export const careerBodies: bodies = {
    defaultCareerBody: () => ({
        dateEnd: dateTime.getDateFormat({year: 2015}),
        dateStart: dateHelper.getDateFormat({year: 2011}),
        organisation: generateTimeSuffix('Organisation'),
        position: generateTimeSuffix('Position'),
        responsibilities: generateTimeSuffix('Responsibilities'),
        website: 'https://rsv.ru'
    })
}

type bodies = {
    defaultCareerBody: () => iCareer
}
