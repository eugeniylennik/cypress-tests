import { generateTimeSuffix } from '@helpers/generate.helpers'
import dateTime from '@helpers/date'
import { iProjectHistory } from '../../../api/rsv-profile/projectHistory/projectHistory.types'

export const projectHistoryBodies: bodies = {
    defaultProjectHistoryBody: () => ({
        dateBegin: dateTime.getDateFormat({year:2010}),
        dateEnd: dateTime.getDateFormat({year:2015}),
        summary: generateTimeSuffix('Summary')
    })
}

type bodies = {
    defaultProjectHistoryBody: () => iProjectHistory
}
