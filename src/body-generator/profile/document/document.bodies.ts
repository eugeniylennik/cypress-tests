import { generateRandomInt, generateTimeSuffix } from '@helpers/generate.helpers'
import dateTime from '@helpers/date'
import { iDocument } from '../../../api/rsv-profile/document/document.types'

export const documentBodies: bodies = {
    defaultDocumentBody: () => ({
        dateOfIssue: dateTime.getDateFormat({year: 1990}),
        files: [],
        issuer: generateTimeSuffix('Issuer'),
        issuerCode: generateTimeSuffix('issuerCode'),
        num: `${generateRandomInt(9999)}`,
        series: `${generateRandomInt(999999)}`
    })
}

type bodies = {
    defaultDocumentBody: () => iDocument
}
