import 'module-alias/register'
import { AxiosInstance } from 'axios'
import { tUserInfo } from '../user.types'
import { getUserProfileById, updateUserInfoProfile } from '@helpers/api-helpers/profile/user/helpers'
import {
    getCatalogByType,
    getCatalogByValue,
    getIndustries,
    searchCatalogData,
    searchData
} from '@helpers/api-helpers/data/data'
import { userBodies } from '@bodyGenerator/profile/user/user.bodies'
import { generateRandomInt } from '@helpers/generate.helpers'
import {
    createEducation,
    getEducations,
    removeEducation,
    updateEducation
} from '@helpers/api-helpers/profile/education/helpers'
import {
    Address, Catalogs,
    DocType,
    EducationInstitutions,
    EducationLevel,
    EducationSpecialities, FormOfStudy,
    Language,
    LanguageLevel,
    MaritalStatus,
    PoliticalParties,
    PositionLevel,
    ProjectHistory,
    SecurityForm, StageHistory,
    StatusResponse,
    WorkersNumber
} from '@helpers/enums'
import { educationBodies } from '@bodyGenerator/profile/education/education.bodies'
import {
    createCareer,
    getCareers,
    removeCareer,
    updateCareer
} from '@helpers/api-helpers/profile/career/helpers'
import { careerBodies } from '@bodyGenerator/profile/career/career.bodies'
import credits from '@data/credits'
import { createInstance } from '@helpers/instance'
import {
    createDocument,
    getDocuments,
    removeDocument,
    updateDocument
} from '@helpers/api-helpers/profile/document/helpers'
import { documentBodies } from '@bodyGenerator/profile/document/document.bodies'
import {
    createProjectHistory,
    getProjectHistories, removeProjectHistory,
    updateProjectHistory
} from '@helpers/api-helpers/profile/projectHistory/helpers'
import { projectHistoryBodies } from '@bodyGenerator/profile/projectHistory/projectHistory.bodies'
import dateTime from '../../../../helpers/date'
import { tAddress, tCatalog, tCatalogs } from '../../../rsv-data/data.types'
import authStep from '../../../rsv-auth/auth.steps'
import { iEducation } from '../../education/education.types'
import { iCareer } from '../../career/career.types'
import { iDocument } from '../../document/document.types'
import { iProjectHistory } from '../../projectHistory/projectHistory.types'

describe('RSV-profile tests', () => {
    let instance: AxiosInstance
    let userId: number
    let userStatus: tCatalog[]
    let userItSkills: tCatalog[]
    let industries: tCatalog[]
    let address: tAddress

    beforeAll(async () => {
        instance = createInstance()
        userId = await authStep(instance).setAuthTokenHeader(credits.user)

        //GET data catalogs
        userStatus = (await getCatalogByType(instance, Catalogs.USER_STATUS)).data
        userItSkills = (await getCatalogByType(instance, Catalogs.IT_SKILLS)).data
        industries = (await getIndustries(instance)).data
        address = (await searchData(instance, Address.MOSCOW)).data
    })

    test('Проверка личных данных пользователя', async () => {
        const user = await getUserProfileById(instance, userId)

        expect(user.status).toBe(StatusResponse.SUCCESS)
        expect(user.data.info.roles).toEqual(credits.user.Roles)
        expect(user.data.info.userId).toBe(userId)
        expect(user.data.info.regEmail).toBe(credits.user.Email)
    })

    test('Редактирование основных данных пользователя', async () => {
        const body: tUserInfo = Object.assign({},
            userBodies.defaultUserInfoMainBody(), {
                activity: [industries[generateRandomInt(industries.length)].field_value],
                foreignStatusId: userStatus[generateRandomInt(userStatus.length)].id,
                itSkills: [userItSkills[generateRandomInt(userItSkills.length)].id],
                address: address.suggestions[0]
            })

        const userUpdated = await updateUserInfoProfile(instance, body)
        expect(userUpdated.status).toBe(StatusResponse.SUCCESS)

        const user = await getUserProfileById(instance, userId)
        expect(user.status).toBe(StatusResponse.SUCCESS)
        expect(user.data.info.name).toBe(body.name)
        expect(user.data.info.surname).toBe(body.surname)
        expect(user.data.info.patronymic).toBe(body.patronymic)
        expect(user.data.info.dateOfBirth).toEqual(dateTime.getDateFormatISO(body.dateOfBirth ?? ''))
        expect(user.data.info.gender).toEqual(body.gender)
        expect(user.data.info.foreignStatusId).toBe(body.foreignStatusId)
        expect(user.data.info.activity).toStrictEqual(body.activity)
        expect(user.data.info.itSkills).toStrictEqual(body.itSkills)
        expect(user.data.info.address).toMatchObject(body.address ?? '')
    })

    test('Редактирование контактов пользователя', async () => {
        const body: tUserInfo = Object.assign({},
            userBodies.defaultUserContactsInfoBody(), {
                placeOfBirth: address.suggestions[0],
                regAddress: address.suggestions[0]
            })
        const userUpdated = await updateUserInfoProfile(instance, body)
        expect(userUpdated.status).toBe(StatusResponse.SUCCESS)

        const user = await getUserProfileById(instance, userId)
        expect(user.status).toBe(StatusResponse.SUCCESS)
        expect(user.data.info.email).toBe(body.email)
        expect(user.data.info.fb).toBe(body.fb)
        expect(user.data.info.instagram).toBe(body.instagram)
        expect(user.data.info.isPlaceOfBirthSpecial).toBe(body.isPlaceOfBirthSpecial)
        expect(user.data.info.ok).toBe(body.ok)
        expect(user.data.info.tel).toBe(body.tel)
        expect(user.data.info.vk).toBe(body.vk)
        expect(user.data.info.yt).toBe(body.yt)
    })

    describe('RSV-profile education tests', () => {
        let educationId: number
        let academicDegree: tCatalog[]
        let educationLevelId: number
        let educationInstitutionId: number
        let educationSpecialityId: number
        let formStudyId: number
        let oksoId: number

        beforeAll(async () => {
            //Уровень образования
            educationLevelId = (await getCatalogByValue(
                instance, Catalogs.EDUCATION_LEVEL, EducationLevel.HIGHER_BACHELOR)).id
            //Учебное заведение
            educationInstitutionId = (await searchCatalogData(instance,
                Catalogs.EDUCATIONAL_INSTITUTIONS, EducationInstitutions.MOY_DOP_CENTER_IT)).id
            //Специальность
            educationSpecialityId = (await searchCatalogData(instance,
                Catalogs.EDUCATION_SPECIALITIES, EducationSpecialities.AGRO)).id
            //Ученая степень
            academicDegree = (await getCatalogByType(instance, Catalogs.ACADEMIC_DEGREE)).data
            //Форма обучения
            formStudyId = (await getCatalogByValue(instance,
                Catalogs.FORM_STUDY, FormOfStudy.FULL_TIME)).id
            //OKSO
            oksoId = (await getCatalogByType(instance, Catalogs.OKSO)).data[0].id
        })

        beforeEach(async () => {
            educationId = (await createEducation(instance, {
                isHonorsDegree: true
            })).data.id
        })

        test('Добавление и редактирование информации высшего образования - бакалавриат пользователя', async () => {
            const body = Object.assign({},
                educationBodies.defaultHigherEducationLevel(), {
                    id: educationId,
                    city: address.suggestions[0],
                    foreignLevelId: educationLevelId,
                    foreignPlaceId: educationInstitutionId,
                    foreignSpecialtyId: educationSpecialityId,
                    foreignDegreeId: academicDegree[0].id,
                    foreignEducationFormId: formStudyId
                    //foreignOksoId: oksoId
                })

            const educationUpdate = await updateEducation(instance, body)
            expect(educationUpdate.status).toBe(StatusResponse.SUCCESS)

            const educations = await getEducations(instance)
            expect(educations.status).toBe(StatusResponse.SUCCESS)

            const education = educations.data.education[0]
            expect(education.id).toBe(educationId)
            expect(education.dateStart).toBe(dateTime.getDateFormatISO(body.dateStart ?? ''))
            expect(education.dateEnd).toBe(dateTime.getDateFormatISO(body.dateEnd ?? ''))
            expect(education.qualification).toBe(body.qualification)
            expect(education.foreignDegreeId).toBe(body.foreignDegreeId)
            expect(education.foreignLevelId).toBe(body.foreignLevelId)
            expect(education.foreignPlaceId).toBe(body.foreignPlaceId)
            expect(education.foreignSpecialtyId).toBe(body.foreignSpecialtyId)
            expect(education.foreignEducationFormId).toBe(body.foreignEducationFormId)
            //expect(education.foreignOksoId).toBe(body.foreignOksoId)
            expect(education.educationProgram).toBe(body.educationProgram)
            expect(education.faculty).toBe(body.faculty)
            expect(education.courseNumber).toBe(body.courseNumber)
            expect(education.isHonorsDegree).toBe(true)
            expect(education.userId).toBe(userId)
        })

        test('Добавление и редактирование информации зарубежного образования пользователя', async () => {
            //Уровень образования
            const educationLevelId = (await getCatalogByValue(
                instance, Catalogs.EDUCATION_LEVEL, EducationLevel.FOREIGN)).id

            const body: iEducation = Object.assign({},
                educationBodies.defaultForeignEducationLevel(), {
                    id: educationId,
                    city: address.suggestions[0],
                    foreignLevelId: educationLevelId,
                    foreignDegreeId: academicDegree[0].id,
                    foreignEducationFormId: formStudyId,
                    foreignOksoId: oksoId
                })
            const educationUpdate = await updateEducation(instance, body)
            expect(educationUpdate.status).toBe(StatusResponse.SUCCESS)

            const educations = await getEducations(instance)
            expect(educations.status).toBe(StatusResponse.SUCCESS)

            const education = educations.data.education[0]
            expect(education.id).toBe(educationId)
            expect(education.dateStart).toBe(dateTime.getDateFormatISO(body.dateStart ?? ''))
            expect(education.dateEnd).toBe(dateTime.getDateFormatISO(body.dateEnd ?? ''))
            expect(education.educationPlace).toBe(body.educationPlace)
            expect(education.qualification).toBe(body.qualification)
            expect(education.foreignDegreeId).toBe(body.foreignDegreeId)
            expect(education.foreignLevelId).toBe(body.foreignLevelId)
            expect(education.specialtySpecial).toBe(body.specialtySpecial)
            expect(education.foreignEducationFormId).toBe(body.foreignEducationFormId)
            // expect(education.foreignOksoId).toBe(body.foreignOksoId)
            expect(education.educationProgram).toBe(body.educationProgram)
            expect(education.faculty).toBe(body.faculty)
            expect(education.courseNumber).toBe(body.courseNumber)
            expect(education.isHonorsDegree).toBe(true)
            expect(education.userId).toBe(userId)
        })

        test('Добавление и редактирование информации основного общего образования пользователя', async () => {
            //Уровень образования
            const educationLevelId = (await getCatalogByValue(
                instance, Catalogs.EDUCATION_LEVEL, EducationLevel.SCHOOL)).id

            const body: iEducation = Object.assign({},
                educationBodies.defaultSchoolEducationLevel(), {
                    id: educationId,
                    city: address.suggestions[0],
                    foreignLevelId: educationLevelId
                })

            const educationUpdate = await updateEducation(instance, body)
            expect(educationUpdate.status).toBe(StatusResponse.SUCCESS)

            const educations = await getEducations(instance)
            expect(educations.status).toBe(StatusResponse.SUCCESS)

            const education = educations.data.education[0]
            expect(education.id).toBe(educationId)
            expect(education.dateStart).toBe(dateTime.getDateFormatISO(body.dateStart ?? ''))
            expect(education.dateEnd).toBe(dateTime.getDateFormatISO(body.dateEnd ?? ''))
            expect(education.foreignLevelId).toBe(body.foreignLevelId)
            expect(education.educationPlace).toBe(body.educationPlace)
            expect(education.schoolClass).toBe(body.schoolClass)
            expect(education.isHonorsDegree).toBe(true)
            expect(education.userId).toBe(userId)
        })

        afterEach(async () => {
            await removeEducation(instance, educationId)
        })
    })

    describe('RSV-profile career tests', () => {
        let careerId: number
        let positionLevelId: number
        let workersNumberId: number

        beforeAll(async () => {
            //Уровень должности
            positionLevelId = (await getCatalogByValue(
                instance, Catalogs.POSITION_LEVEL, PositionLevel.WORKS_HIMSELF)).id
            //Количество сотрудников организации
            workersNumberId = (await getCatalogByValue(
                instance, Catalogs.WORKERS_NUMBER, WorkersNumber.FIFTY_THOUSANDS)).id
        })

        beforeEach(async () => {
            careerId = (await createCareer(instance, {
                isUntilNow: false
            })).data.id
        })

        test('Добавление и редактирование информации о карьере пользователя', async () => {
            const body: iCareer = Object.assign({},
                careerBodies.defaultCareerBody(), {
                    id: careerId,
                    foreignPositionLevelId: positionLevelId,
                    foreignWorkersNumberId: workersNumberId,
                    region: address.suggestions[0]
                })
            const careerUpdate = await updateCareer(instance, body)
            expect(careerUpdate.status).toBe(StatusResponse.SUCCESS)

            const careers = await getCareers(instance)
            expect(careers.status).toBe(StatusResponse.SUCCESS)
            const career = careers.data.career[0]

            expect(career.id).toBe(body.id)
            expect(career.dateEnd).toEqual(dateTime.getDateFormatISO(body.dateEnd ?? ''))
            expect(career.dateStart).toEqual(dateTime.getDateFormatISO(body.dateStart ?? ''))
            expect(career.userId).toBe(userId)
            expect(career.region).toMatchObject(body.region ?? '')
            expect(career.organisation).toBe(body.organisation)
            expect(career.foreignPositionLevelId).toBe(body.foreignPositionLevelId)
            expect(career.foreignWorkersNumberId).toBe(body.foreignWorkersNumberId)
            expect(career.isUntilNow).toEqual(false)
            expect(career.responsibilities).toBe(body.responsibilities)
            expect(career.position).toBe(body.position)
            expect(career.website).toBe(body.website)
        })

        afterEach(async () => {
            await removeCareer(instance, careerId)
        })
    })

    describe('RSV-profile document tests', () => {
        let documentId: number
        let docTypeId: number

        beforeAll(async () => {
            //Вид документа
            docTypeId = (await getCatalogByValue(
                instance, Catalogs.DOCS, DocType.PASSPORT)).id
        })

        beforeEach(async () => {
            documentId = (await createDocument(instance, {})).data.id
        })

        test('Добавление и редактирование информации о документах пользователя', async () => {
            const body: iDocument = Object.assign({},
                documentBodies.defaultDocumentBody(), {
                    id: documentId,
                    foreignDocTypeId: docTypeId
                })
            const docUpdate = await updateDocument(instance, body)
            expect(docUpdate.status).toBe(StatusResponse.SUCCESS)

            const documents = await getDocuments(instance)
            expect(documents.status).toBe(StatusResponse.SUCCESS)
            const document = documents.data.docs[0]

            expect(document.id).toBe(documentId)
            expect(document.files).toStrictEqual(body.files)
            expect(document.dateOfIssue).toBe(`${body.dateOfIssue}T00:00:00+00:00`)
            expect(document.foreignDocTypeId).toBe(body.foreignDocTypeId)
            expect(document.issuer).toBe(body.issuer)
            expect(document.issuerCode).toBe(body.issuerCode)
            expect(document.num).toBe(body.num)
            expect(document.series).toBe(body.series)
            expect(document.userId).toBe(userId)
        })

        afterEach(async () => {
            await removeDocument(instance, documentId)
        })
    })

    describe('RSV-profile other test', () => {
        let maritalStatusId: number
        let languagesId: number
        let levelLanguageId: number
        let politicalPartiesId: number
        let securityFormId: number

        beforeAll(async () => {
            //Семейный статус
            maritalStatusId = (await getCatalogByValue(
                instance, Catalogs.MARITAL_STATUS, MaritalStatus.REGISTERED_MARRIAGE)).id
            //Язык
            languagesId = (await getCatalogByValue(
                instance, Catalogs.LANGUAGES, Language.ENGLISH)).id
            //Уровень владения
            levelLanguageId = (await getCatalogByValue(
                instance, Catalogs.LEVEL_LANGUAGE, LanguageLevel.IN_EXCELLENCE)).id
            //Полетическая партия
            politicalPartiesId = (await getCatalogByValue(
                instance, Catalogs.POLITICAL_PARTIES, PoliticalParties.ROSSIA_FUTURE)).id
            //Форма допуская
            securityFormId = (await getCatalogByValue(
                instance, Catalogs.SECURITY_FORM, SecurityForm.FIRST_FORM)).id
        })

        test('Редактирование прочей информации пользователя', async () => {
            const body: tUserInfo = Object.assign({},
                userBodies.defaultOtherInfoBody(), {
                    foreignGosSecretTypeId: securityFormId,
                    foreignMaritalStatusId: maritalStatusId,
                    foreignPartyMemberId: politicalPartiesId,
                    userLanguages: [{
                        foreignLanguageId: languagesId,
                        foreignLanguageLevelId: levelLanguageId
                    }]
                })
            const userUpdated = await updateUserInfoProfile(instance, body)
            expect(userUpdated.status).toBe(StatusResponse.SUCCESS)

            const user = await getUserProfileById(instance, userId)
            expect(user.status).toBe(StatusResponse.SUCCESS)
            expect(user.data.info.children).toBe(body.children)
            expect(user.data.info.gosSecretFrom).toBe(
                dateTime.getDateFormatISO(body.gosSecretFrom ?? '')
            )
            expect(user.data.info.gosSecretTo).toBe(
                dateTime.getDateFormatISO(body.gosSecretTo ?? '')
            )
            expect(user.data.info.isMember).toBe(body.isMember)
            expect(user.data.info.isSecret).toBe(body.isSecret)
            expect(user.data.info.isSocial).toBe(body.isSocial)
            expect(user.data.info.isVolunteer).toBe(body.isVolunteer)
            expect(user.data.info.maidenSurname).toBe(body.maidenSurname)
            expect(user.data.info.socialActivity).toBe(body.socialActivity)
            expect(user.data.info.volunteerActivity).toBe(body.volunteerActivity)
            expect(user.data.info.warVeteran).toBe(body.warVeteran)
            expect(user.data.info.foreignGosSecretTypeId).toBe(body.foreignGosSecretTypeId)
            expect(user.data.info.foreignMaritalStatusId).toBe(body.foreignMaritalStatusId)
            expect(user.data.info.foreignPartyMemberId).toBe(body.foreignPartyMemberId)
            expect(user.data.info.userLanguages).toMatchObject(body.userLanguages ?? '')
        })
    })

    describe('RSV-profile project-history tests', () => {
        let projectId: number
        let projectHistoryId: number
        let stageHistoryId: number

        beforeAll(async () => {
            //Название проекта
            projectHistoryId = (await getCatalogByValue(
                instance, Catalogs.PROJECT_HISTORY, ProjectHistory.CP)).id
            //Результат участия
            stageHistoryId = (await getCatalogByValue(
                instance, Catalogs.STAGE_HISTORY, StageHistory.WINNER)).id
        })

        beforeEach(async () => {
            projectId = (await createProjectHistory(instance, {})).data.projectHistory.id
        })

        test('Добавление и редактирование информации участия в проектах пользователя', async () => {
            const body: iProjectHistory = Object.assign({},
                projectHistoryBodies.defaultProjectHistoryBody(), {
                    id: projectId,
                    foreignResultId: stageHistoryId,
                    foreignSeasonId: projectHistoryId
                })
            const projectHistoryUpdate = await updateProjectHistory(instance, body)
            expect(projectHistoryUpdate.status).toBe(StatusResponse.SUCCESS)

            const projectHistory = await getProjectHistories(instance)
            expect(projectHistory.status).toBe(StatusResponse.SUCCESS)
            const project = projectHistory.data.histories[0]

            expect(project.id).toBe(projectId)
            expect(project.dateEnd).toBe(
                dateTime.getDateFormatISO(body.dateEnd ?? '')
            )
            expect(project.dateBegin).toBe(
                dateTime.getDateFormatISO(body.dateBegin ?? '')
            )
            expect(project.foreignResultId).toBe(body.foreignResultId)
            expect(project.foreignSeasonId).toBe(body.foreignSeasonId)
            expect(project.summary).toBe(body.summary)
            expect(project.userId).toBe(userId)
        })

        afterEach(async () => {
            await removeProjectHistory(instance, projectId)
        })
    })

})
