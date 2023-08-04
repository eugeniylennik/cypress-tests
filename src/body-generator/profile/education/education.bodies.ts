import {
    generateRandomIntBetweenNumber,
    generateRandomIntFromInterval,
    generateTimeSuffix
} from '@helpers/generate.helpers'
import dateTime from '@helpers/date'
import { iEducation } from '../../../api/rsv-profile/education/education.types'

export const educationBodies: bodies = {
    defaultHigherEducationLevel: () => ({
        dateEnd: dateTime.getDateFormat({year:2015}),
        dateStart: dateTime.getDateFormat({year:2011}),
        qualification: generateTimeSuffix('Qualification'),
        educationProgram: generateTimeSuffix('EducationProgram'),
        faculty: generateTimeSuffix('Faculty'),
        courseNumber: generateRandomIntBetweenNumber(1, 6)
    }),
    defaultForeignEducationLevel: () => ({
        dateEnd: dateTime.getDateFormat({year:2015}),
        dateStart: dateTime.getDateFormat({year:2011}),
        qualification: generateTimeSuffix('Qualification'),
        educationPlace: generateTimeSuffix('EducationPlace'),
        specialtySpecial: generateTimeSuffix('SpecialtySpecial'),
        educationProgram: generateTimeSuffix('EducationProgram'),
        faculty: generateTimeSuffix('Faculty'),
        courseNumber: generateRandomIntBetweenNumber(1, 6)
    }),
    defaultSchoolEducationLevel: () => ({
        dateEnd: dateTime.getDateFormat({year:2015}),
        dateStart: dateTime.getDateFormat({year:2011}),
        educationPlace: generateTimeSuffix('EducationPlace'),
        schoolClass: generateRandomIntFromInterval(1, 11)
    })
}

type bodies = {
    defaultHigherEducationLevel: () => iEducation
    defaultForeignEducationLevel: () => iEducation
    defaultSchoolEducationLevel: () => iEducation
}
