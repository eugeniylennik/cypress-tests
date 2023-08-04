import { createInstance } from '@helpers/instance'
import { AxiosInstance } from 'axios'
import { tQueryParams, tRegistration } from '../../../utils/types/identity.types'
import { clients, portalClient } from '../../../data/clients/clients'
import { userBodies } from '../../../utils/generate.helpers'
import credits from '@data/credits'
import {
    deletePersonData,
    getUserProfileById,
    getUsersByFilter,
    markAsDeleted,
    updateUserProfile
} from '@helpers/api-helpers/profile/user/helpers'
import { filterBodies } from '@bodyGenerator/profile/user/filter/filter.bodies'
import LoginPage from '../../../pages/identity/login/Login'
import { generatePhoneNumber } from '@helpers/generate.helpers'
import {
    assertAddPhonePostFormData,
    assertAuthorizationPostFormData,
    assertCallbackAndToken,
    assertPhoneConfirmationPostFormData,
    tOptions
} from '../../../pages/assertion'
import authStep from '@api/rsv-auth/auth.steps'

describe('Админские роли', () => {

    const loginPage = new LoginPage
    let instance: AxiosInstance
    let userId: number

    context('Администратор ROLE_ADMIN', () => {
        const client: tQueryParams = clients(portalClient)
        const user: tRegistration = userBodies.defaultUserEmailBody()
        const options: tOptions = { client, user }

        beforeEach(() => {
            instance = createInstance()
            cy.registration(client, user)
                .then({ timeout: 15000 }, async () => {
                    //Авторизация с ролью админ, получение токена
                    await authStep(instance).setAuthTokenHeader(credits.admin)
                    //Получение userId с помощью метода фильтрации по Email
                    userId = (await getUsersByFilter(instance,
                        filterBodies.defaultUserFilterByEmail(user.Email ?? ''))
                    ).data.users[0].userId as number
                    //Обновление пользователю роль администратора
                    await updateUserProfile(instance, {
                        user_id: userId,
                        roles: ['ROLE_USER', 'ROLE_ADMIN']
                    })
                    //Очистка куки идентити для открытия формы авторизации
                }).clearCookies()
                .visitAccountLogin(client)
        })

        it.only('Авторизация с ролью ROLE_ADMIN. Добавление и подтверждение номера телефона', () => {
            //Заполнение формы авторизации
            loginPage.form.authorization({
                Email: user.Email,
                Password: user.Password
            })
            //Проверка отправки формы авторизации
            assertAuthorizationPostFormData(options)
            options.user = Object.assign({}, user, {
                Phone: generatePhoneNumber()
            })
            //Заполнение формы подтверждения номера телефона
            loginPage.phone.submitPhoneNumber(options.user.Phone!)
            //Проверка добавления админского номера телефона
            assertAddPhonePostFormData(options)
            //Подтверждение номера телефона кодом смс
            loginPage.confirm.submitCodeConfirmation(Cypress.env('STATIC_CODE'))
            //Проверка подтверждения номера телефона
            assertPhoneConfirmationPostFormData(options)
            //Проверка получения токена
            assertCallbackAndToken(options)
            //Проверка профайл юзера роли и подтвержденный номер телефона
            cy.then(async () => {
                const profile = await getUserProfileById(instance, userId)
                expect(profile.data.info.roles).to.eql(['ROLE_ADMIN', 'ROLE_USER'])
                expect(profile.data.info.isTelConfirmed).to.eq(true)
                expect(profile.data.info.tel).to.eq(
                    `${options.user.Phone?.code}${options.user.Phone?.phone}`
                )
            })
        })
    })
    context('Администратор ROLE_ADMIN с номером телефона', () => {
        const client: tQueryParams = clients(portalClient)
        const user: tRegistration = userBodies.defaultUserPhoneBody()
        const options: tOptions = { client, user }

        beforeEach(() => {
            instance = createInstance()
            cy.registration(client, user)
                .then({ timeout: 15000 }, async () => {
                    //Авторизация с ролью админ, получение токена
                    await authStep(instance).setAuthTokenHeader(credits.admin)
                    //Получение userId с помощью метода фильтрации по Email
                    userId = (await getUsersByFilter(instance,
                        filterBodies.defaultUserFilterByPhone(
                            `${user.Phone?.code}${user.Phone?.phone}` ?? ''
                        )
                    )).data.users[0].userId as number
                    //Обновление пользователю роль администратора
                    await updateUserProfile(instance, {
                        user_id: userId,
                        roles: ['ROLE_USER', 'ROLE_ADMIN']
                    })
                    //Очистка куки идентити для открытия формы авторизации
                }).clearCookies()
                .visitAccountLogin(client)
        })

        it('Авторизация с ролью ROLE_ADMIN. Подтверждение номера телефона', () => {
            //Заполнение формы авторизации
            loginPage.form.radioBtnPhone().click()
            loginPage.form.phone.authorizationByPhone(options.user)
            //Проверка отправки формы авторизации
            assertAuthorizationPostFormData(options)
            //Подтверждение номера телефона кодом смс
            loginPage.confirm.submitCodeConfirmation(Cypress.env('STATIC_CODE'))
            //Проверка получения токена
            assertCallbackAndToken(options)
            //Проверка профайл юзера роли и подтвержденный номер телефона
            cy.then(async () => {
                const profile = await getUserProfileById(instance, userId)
                expect(profile.data.info.roles).to.eql(['ROLE_ADMIN', 'ROLE_USER'])
                expect(profile.data.info.isTelConfirmed).to.eq(true)
                expect(profile.data.info.tel).to.eq(
                    `${options.user.Phone?.code}${options.user.Phone?.phone}`
                )
                expect(profile.data.info.regTel).to.eq(
                    `${options.user.Phone?.code}${options.user.Phone?.phone}`
                )
            })
        })
    })
    context('Администратор обучения ROLE_EDUCATION_ADMIN', () => {
        const client: tQueryParams = clients(portalClient)
        const user: tRegistration = userBodies.defaultUserEmailBody()
        const options: tOptions = {client, user}

        beforeEach(() => {
            instance = createInstance()
            cy.registration(client, user)
                .then({ timeout: 15000 }, async () => {
                    //Авторизация с ролью админ, получение токена
                    await authStep(instance).setAuthTokenHeader(credits.admin)
                    //Получение userId с помощью метода фильтрации по Email
                    userId = (await getUsersByFilter(instance,
                        filterBodies.defaultUserFilterByEmail(user.Email ?? ''))
                    ).data.users[0].userId as number
                    //Обновление пользователю роль администратора
                    await updateUserProfile(instance, {
                        user_id: userId,
                        roles: ['ROLE_USER', 'ROLE_EDUCATION_ADMIN']
                    })
                    //Очистка куки идентити для открытия формы авторизации
                }).clearCookies()
                .visitAccountLogin(client)
        })

        it('Авторизация с ролью ROLE_EDUCATION_ADMIN. Добавление и подтверждение номера телефона', () => {
            //Заполнение формы авторизации
            loginPage.form.authorization({
                Email: user.Email,
                Password: user.Password
            })
            //Проверка отправки формы авторизации
            assertAuthorizationPostFormData(options)
            options.user = Object.assign({}, user, {
                Phone: generatePhoneNumber()
            })
            //Заполнение формы подтверждения номера телефона
            loginPage.phone.submitPhoneNumber(options.user.Phone!)
            //Проверка добавления админского номера телефона
            assertAddPhonePostFormData(options)
            //Подтверждение номера телефона кодом смс
            loginPage.confirm.submitCodeConfirmation(Cypress.env('STATIC_CODE'))
            //Проверка подтверждения номера телефона
            assertPhoneConfirmationPostFormData(options)
            //Проверка получения токена
            //Проверка профайл юзера роли и подтвержденный номер телефона
            cy.then(async () => {
                const profile = await getUserProfileById(instance, userId)
                expect(profile.data.info.roles).to.eql(['ROLE_EDUCATION_ADMIN', 'ROLE_USER'])
                expect(profile.data.info.isTelConfirmed).to.eq(true)
                expect(profile.data.info.tel).to.eq(
                    `${options.user.Phone?.code}${options.user.Phone?.phone}`
                )
            })
        })
    })
    context('Администратор прес-службы ROLE_PRESS_ADMIN', () => {
        const client: tQueryParams = clients(portalClient)
        const user: tRegistration = userBodies.defaultUserEmailBody()
        const options: tOptions = {client, user}

        beforeEach(() => {
            instance = createInstance()
            cy.registration(client, user)
                .then({timeout: 15000}, async () => {
                    //Авторизация с ролью админ, получение токена
                    await authStep(instance).setAuthTokenHeader(credits.admin)
                    //Получение userId с помощью метода фильтрации по Email
                    userId = (await getUsersByFilter(instance,
                        filterBodies.defaultUserFilterByEmail(user.Email ?? ''))
                    ).data.users[0].userId as number
                    //Обновление пользователю роль администратора
                    await updateUserProfile(instance, {
                        user_id: userId,
                        roles: ['ROLE_USER', 'ROLE_PRESS_ADMIN']
                    })
                    //Очистка куки идентити для открытия формы авторизации
                }).clearCookies()
                .visitAccountLogin(client)
        })

        it('Авторизация с ролью ROLE_PRESS_ADMIN. Добавление и подтверждение номера телефона', () => {
            //Заполнение формы авторизации
            loginPage.form.authorization({
                Email: user.Email,
                Password: user.Password
            })
            //Проверка отправки формы авторизации
            assertAuthorizationPostFormData(options)
            options.user = Object.assign({}, user, {
                Phone: generatePhoneNumber()
            })
            //Заполнение формы подтверждения номера телефона
            loginPage.phone.submitPhoneNumber(options.user.Phone!)
            //Проверка добавления админского номера телефона
            assertAddPhonePostFormData(options)
            //Подтверждение номера телефона кодом смс
            loginPage.confirm.submitCodeConfirmation(Cypress.env('STATIC_CODE'))
            //Проверка подтверждения номера телефона
            assertPhoneConfirmationPostFormData(options)
            //Проверка получения токена
            assertCallbackAndToken(options)
            //Проверка профайл юзера роли и подтвержденный номер телефона
            cy.then(async () => {
                const profile = await getUserProfileById(instance, userId)
                expect(profile.data.info.roles).to.eql(['ROLE_PRESS_ADMIN', 'ROLE_USER'])
                expect(profile.data.info.isTelConfirmed).to.eq(true)
                expect(profile.data.info.tel).to.eq(
                    `${options.user.Phone?.code}${options.user.Phone?.phone}`
                )
            })
        })
    })
    context('Руководитель ROLE_HEAD_OFFICE_MANAGER', () => {
        const client: tQueryParams = clients(portalClient)
        const user: tRegistration = userBodies.defaultUserEmailBody()
        const options: tOptions = {client, user}

        beforeEach(() => {
            instance = createInstance()
            cy.registration(client, user)
                .then({timeout: 15000}, async () => {
                    //Авторизация с ролью админ, получение токена
                    await authStep(instance).setAuthTokenHeader(credits.admin)
                    //Получение userId с помощью метода фильтрации по Email
                    userId = (await getUsersByFilter(instance,
                        filterBodies.defaultUserFilterByEmail(user.Email ?? ''))
                    ).data.users[0].userId as number
                    //Обновление пользователю роль администратора
                    await updateUserProfile(instance, {
                        user_id: userId,
                        roles: ['ROLE_USER', 'ROLE_HEAD_OFFICE_MANAGER']
                    })
                    //Очистка куки идентити для открытия формы авторизации
                }).clearCookies()
                .visitAccountLogin(client)
        })

        it('Авторизация с ролью ROLE_HEAD_OFFICE_MANAGER. Добавление и подтверждение номера телефона', () => {
            //Заполнение формы авторизации
            loginPage.form.authorization({
                Email: user.Email,
                Password: user.Password
            })
            //Проверка отправки формы авторизации
            assertAuthorizationPostFormData(options)
            options.user = Object.assign({}, user, {
                Phone: generatePhoneNumber()
            })
            //Заполнение формы подтверждения номера телефона
            loginPage.phone.submitPhoneNumber(options.user.Phone!)
            //Проверка добавления админского номера телефона
            assertAddPhonePostFormData(options)
            //Подтверждение номера телефона кодом смс
            loginPage.confirm.submitCodeConfirmation(Cypress.env('STATIC_CODE'))
            //Проверка подтверждения номера телефона
            assertPhoneConfirmationPostFormData(options)
            //Проверка получения токена
            assertCallbackAndToken(options)
            //Проверка профайл юзера роли и подтвержденный номер телефона
            cy.then(async () => {
                const profile = await getUserProfileById(instance, userId)
                expect(profile.data.info.roles).to.eql(['ROLE_HEAD_OFFICE_MANAGER', 'ROLE_USER'])
                expect(profile.data.info.isTelConfirmed).to.eq(true)
                expect(profile.data.info.tel).to.eq(
                    `${options.user.Phone?.code}${options.user.Phone?.phone}`
                )
            })
        })
    })
    context('Администратор клубов ROLE_CLUBS_ADMIN', () => {
        const client: tQueryParams = clients(portalClient)
        const user: tRegistration = userBodies.defaultUserEmailBody()
        const options: tOptions = {client, user}

        beforeEach(() => {
            instance = createInstance()
            cy.registration(client, user)
                .then({timeout: 15000}, async () => {
                    //Авторизация с ролью админ, получение токена
                    await authStep(instance).setAuthTokenHeader(credits.admin)
                    //Получение userId с помощью метода фильтрации по Email
                    userId = (await getUsersByFilter(instance,
                        filterBodies.defaultUserFilterByEmail(user.Email ?? ''))
                    ).data.users[0].userId as number
                    //Обновление пользователю роль администратора
                    await updateUserProfile(instance, {
                        user_id: userId,
                        roles: ['ROLE_USER', 'ROLE_CLUBS_ADMIN']
                    })
                    //Очистка куки идентити для открытия формы авторизации
                }).clearCookies()
                .visitAccountLogin(client)
        })

        it('Авторизация с ролью ROLE_CLUBS_ADMIN. Добавление и подтверждение номера телефона', () => {
            //Заполнение формы авторизации
            loginPage.form.authorization({
                Email: user.Email,
                Password: user.Password
            })
            //Проверка отправки формы авторизации
            assertAuthorizationPostFormData(options)
            options.user = Object.assign({}, user, {
                Phone: generatePhoneNumber()
            })
            //Заполнение формы подтверждения номера телефона
            loginPage.phone.submitPhoneNumber(options.user.Phone!)
            //Проверка добавления админского номера телефона
            assertAddPhonePostFormData(options)
            //Подтверждение номера телефона кодом смс
            loginPage.confirm.submitCodeConfirmation(Cypress.env('STATIC_CODE'))
            //Проверка подтверждения номера телефона
            assertPhoneConfirmationPostFormData(options)
            //Проверка получения токена
            assertCallbackAndToken(options)
            //Проверка профайл юзера роли и подтвержденный номер телефона
            cy.then(async () => {
                const profile = await getUserProfileById(instance, userId)
                expect(profile.data.info.roles).to.eql(['ROLE_CLUBS_ADMIN', 'ROLE_USER'])
                expect(profile.data.info.isTelConfirmed).to.eq(true)
                expect(profile.data.info.tel).to.eq(
                    `${options.user.Phone?.code}${options.user.Phone?.phone}`
                )
            })
        })
    })
    context('Эксперт ROLE_EXPERT', () => {
        const client: tQueryParams = clients(portalClient)
        const user: tRegistration = userBodies.defaultUserEmailBody()
        const options: tOptions = {client, user}

        beforeEach(() => {
            instance = createInstance()
            cy.registration(client, user)
                .then({timeout: 15000}, async () => {
                    //Авторизация с ролью админ, получение токена
                    await authStep(instance).setAuthTokenHeader(credits.admin)
                    //Получение userId с помощью метода фильтрации по Email
                    userId = (await getUsersByFilter(instance,
                        filterBodies.defaultUserFilterByEmail(user.Email ?? ''))
                    ).data.users[0].userId as number
                    //Обновление пользователю роль администратора
                    await updateUserProfile(instance, {
                        user_id: userId,
                        roles: ['ROLE_USER', 'ROLE_EXPERT']
                    })
                    //Очистка куки идентити для открытия формы авторизации
                }).clearCookies()
                .visitAccountLogin(client)
        })

        it('Авторизация с ролью ROLE_EXPERT. Добавление и подтверждение номера телефона', () => {
            //Заполнение формы авторизации
            loginPage.form.authorization({
                Email: user.Email,
                Password: user.Password
            })
            //Проверка отправки формы авторизации
            assertAuthorizationPostFormData(options)
            options.user = Object.assign({}, user, {
                Phone: generatePhoneNumber()
            })
            //Заполнение формы подтверждения номера телефона
            loginPage.phone.submitPhoneNumber(options.user.Phone!)
            //Проверка добавления админского номера телефона
            assertAddPhonePostFormData(options)
            //Подтверждение номера телефона кодом смс
            loginPage.confirm.submitCodeConfirmation(Cypress.env('STATIC_CODE'))
            //Проверка подтверждения номера телефона
            assertPhoneConfirmationPostFormData(options)
            //Проверка получения токена
            assertCallbackAndToken(options)
            //Проверка профайл юзера роли и подтвержденный номер телефона
            cy.then(async () => {
                const profile = await getUserProfileById(instance, userId)
                expect(profile.data.info.roles).to.eql(['ROLE_EXPERT', 'ROLE_USER'])
                expect(profile.data.info.isTelConfirmed).to.eq(true)
                expect(profile.data.info.tel).to.eq(
                    `${options.user.Phone?.code}${options.user.Phone?.phone}`
                )
            })
        })
    })
    context('Куратор ROLE_CURATOR', () => {
        const client: tQueryParams = clients(portalClient)
        const user: tRegistration = userBodies.defaultUserEmailBody()
        const options: tOptions = {client, user}

        beforeEach(() => {
            instance = createInstance()
            cy.registration(client, user)
                .then({timeout: 15000}, async () => {
                    //Авторизация с ролью админ, получение токена
                    await authStep(instance).setAuthTokenHeader(credits.admin)
                    //Получение userId с помощью метода фильтрации по Email
                    userId = (await getUsersByFilter(instance,
                        filterBodies.defaultUserFilterByEmail(user.Email ?? ''))
                    ).data.users[0].userId as number
                    //Обновление пользователю роль администратора
                    await updateUserProfile(instance, {
                        user_id: userId,
                        roles: ['ROLE_USER', 'ROLE_CURATOR']
                    })
                    //Очистка куки идентити для открытия формы авторизации
                }).clearCookies()
                .visitAccountLogin(client)
        })

        it('Авторизация с ролью ROLE_CURATOR. Добавление и подтверждение номера телефона', () => {
            //Заполнение формы авторизации
            loginPage.form.authorization({
                Email: user.Email,
                Password: user.Password
            })
            //Проверка отправки формы авторизации
            assertAuthorizationPostFormData(options)
            options.user = Object.assign({}, user, {
                Phone: generatePhoneNumber()
            })
            //Заполнение формы подтверждения номера телефона
            loginPage.phone.submitPhoneNumber(options.user.Phone!)
            //Проверка добавления админского номера телефона
            assertAddPhonePostFormData(options)
            //Подтверждение номера телефона кодом смс
            loginPage.confirm.submitCodeConfirmation(Cypress.env('STATIC_CODE'))
            //Проверка подтверждения номера телефона
            assertPhoneConfirmationPostFormData(options)
            //Проверка получения токена
            assertCallbackAndToken(options)
            //Проверка профайл юзера роли и подтвержденный номер телефона
            cy.then(async () => {
                const profile = await getUserProfileById(instance, userId)
                expect(profile.data.info.roles).to.eql(['ROLE_CURATOR', 'ROLE_USER'])
                expect(profile.data.info.isTelConfirmed).to.eq(true)
                expect(profile.data.info.tel).to.eq(
                    `${options.user.Phone?.code}${options.user.Phone?.phone}`
                )
            })
        })
    })
    context('Администратор проектов ROLE_PROJECT_ADMIN', () => {
        const client: tQueryParams = clients(portalClient)
        const user: tRegistration = userBodies.defaultUserEmailBody()
        const options: tOptions = {client, user}

        beforeEach(() => {
            instance = createInstance()
            cy.registration(client, user)
                .then({timeout: 15000}, async () => {
                    //Авторизация с ролью админ, получение токена
                    await authStep(instance).setAuthTokenHeader(credits.admin)
                    //Получение userId с помощью метода фильтрации по Email
                    userId = (await getUsersByFilter(instance,
                        filterBodies.defaultUserFilterByEmail(user.Email ?? ''))
                    ).data.users[0].userId as number
                    //Обновление пользователю роль администратора
                    await updateUserProfile(instance, {
                        user_id: userId,
                        roles: ['ROLE_USER', 'ROLE_PROJECT_ADMIN']
                    })
                    //Очистка куки идентити для открытия формы авторизации
                }).clearCookies()
                .visitAccountLogin(client)
        })

        it('Авторизация с ролью ROLE_PROJECT_ADMIN. Добавление и подтверждение номера телефона', () => {
            //Заполнение формы авторизации
            loginPage.form.authorization({
                Email: user.Email,
                Password: user.Password
            })
            //Проверка отправки формы авторизации
            assertAuthorizationPostFormData(options)
            options.user = Object.assign({}, user, {
                Phone: generatePhoneNumber()
            })
            //Заполнение формы подтверждения номера телефона
            loginPage.phone.submitPhoneNumber(options.user.Phone!)
            //Проверка добавления админского номера телефона
            assertAddPhonePostFormData(options)
            //Подтверждение номера телефона кодом смс
            loginPage.confirm.submitCodeConfirmation(Cypress.env('STATIC_CODE'))
            //Проверка подтверждения номера телефона
            assertPhoneConfirmationPostFormData(options)
            //Проверка получения токена
            assertCallbackAndToken(options)
            //Проверка профайл юзера роли и подтвержденный номер телефона
            cy.then(async () => {
                const profile = await getUserProfileById(instance, userId)
                expect(profile.data.info.roles).to.eql(['ROLE_PROJECT_ADMIN', 'ROLE_USER'])
                expect(profile.data.info.isTelConfirmed).to.eq(true)
                expect(profile.data.info.tel).to.eq(
                    `${options.user.Phone?.code}${options.user.Phone?.phone}`
                )
            })
        })
    })
    context('Администратор проектов (только просмотр) ROLE_PROJECT_ADMIN_READ_ONLY', () => {
        const client: tQueryParams = clients(portalClient)
        const user: tRegistration = userBodies.defaultUserEmailBody()
        const options: tOptions = {client, user}

        beforeEach(() => {
            instance = createInstance()
            cy.registration(client, user)
                .then({timeout: 15000}, async () => {
                    //Авторизация с ролью админ, получение токена
                    await authStep(instance).setAuthTokenHeader(credits.admin)
                    //Получение userId с помощью метода фильтрации по Email
                    userId = (await getUsersByFilter(instance,
                        filterBodies.defaultUserFilterByEmail(user.Email ?? ''))
                    ).data.users[0].userId as number
                    //Обновление пользователю роль администратора
                    await updateUserProfile(instance, {
                        user_id: userId,
                        roles: ['ROLE_USER', 'ROLE_PROJECT_ADMIN_READ_ONLY']
                    })
                    //Очистка куки идентити для открытия формы авторизации
                }).clearCookies()
                .visitAccountLogin(client)
        })

        it('Авторизация с ролью ROLE_PROJECT_ADMIN_READ_ONLY. Добавление и подтверждение номера телефона', () => {
            //Заполнение формы авторизации
            loginPage.form.authorization({
                Email: user.Email,
                Password: user.Password
            })
            //Проверка отправки формы авторизации
            assertAuthorizationPostFormData(options)
            options.user = Object.assign({}, user, {
                Phone: generatePhoneNumber()
            })
            //Заполнение формы подтверждения номера телефона
            loginPage.phone.submitPhoneNumber(options.user.Phone!)
            //Проверка добавления админского номера телефона
            assertAddPhonePostFormData(options)
            //Подтверждение номера телефона кодом смс
            loginPage.confirm.submitCodeConfirmation(Cypress.env('STATIC_CODE'))
            //Проверка подтверждения номера телефона
            assertPhoneConfirmationPostFormData(options)
            //Проверка получения токена
            assertCallbackAndToken(options)
            //Проверка профайл юзера роли и подтвержденный номер телефона
            cy.then(async () => {
                const profile = await getUserProfileById(instance, userId)
                expect(profile.data.info.roles).to.eql(['ROLE_PROJECT_ADMIN_READ_ONLY', 'ROLE_USER'])
                expect(profile.data.info.isTelConfirmed).to.eq(true)
                expect(profile.data.info.tel).to.eq(
                    `${options.user.Phone?.code}${options.user.Phone?.phone}`
                )
            })
        })
    })
    context('Администратор просмотр пользователей ROLE_USER_ADMIN_READ_ONLY', () => {
        const client: tQueryParams = clients(portalClient)
        const user: tRegistration = userBodies.defaultUserEmailBody()
        const options: tOptions = { client, user }

        beforeEach(() => {
            instance = createInstance()
            cy.registration(client, user)
                .then({ timeout: 15000 }, async () => {
                    //Авторизация с ролью админ, получение токена
                    await authStep(instance).setAuthTokenHeader(credits.admin)
                    //Получение userId с помощью метода фильтрации по Email
                    userId = (await getUsersByFilter(instance,
                        filterBodies.defaultUserFilterByEmail(user.Email ?? ''))
                    ).data.users[0].userId as number
                    //Обновление пользователю роль администратора
                    await updateUserProfile(instance, {
                        user_id: userId,
                        roles: ['ROLE_USER', 'ROLE_USER_ADMIN_READ_ONLY']
                    })
                    //Очистка куки идентити для открытия формы авторизации
                }).clearCookies()
                .visitAccountLogin(client)
        })

        it('Авторизация с ролью ROLE_USER_ADMIN_READ_ONLY. Добавление и подтверждение номера телефона', () => {
            //Заполнение формы авторизации
            loginPage.form.authorization({
                Email: user.Email,
                Password: user.Password
            })
            //Проверка отправки формы авторизации
            assertAuthorizationPostFormData(options)
            options.user = Object.assign({}, user, {
                Phone: generatePhoneNumber()
            })
            //Заполнение формы подтверждения номера телефона
            loginPage.phone.submitPhoneNumber(options.user.Phone!)
            //Проверка добавления админского номера телефона
            assertAddPhonePostFormData(options)
            //Подтверждение номера телефона кодом смс
            loginPage.confirm.submitCodeConfirmation(Cypress.env('STATIC_CODE'))
            //Проверка подтверждения номера телефона
            assertPhoneConfirmationPostFormData(options)
            //Проверка получения токена
            assertCallbackAndToken(options)
            //Проверка профайл юзера роли и подтвержденный номер телефона
            cy.then(async () => {
                const profile = await getUserProfileById(instance, userId)
                expect(profile.data.info.roles).to.eql(['ROLE_USER_ADMIN_READ_ONLY', 'ROLE_USER'])
                expect(profile.data.info.isTelConfirmed).to.eq(true)
                expect(profile.data.info.tel).to.eq(
                    `${options.user.Phone?.code}${options.user.Phone?.phone}`
                )
            })
        })
    })
    afterEach(() => {
        //Удаление и очистка персональных данных пользователя
        cy.then(async () => {
            await markAsDeleted(instance, { userId: userId })
            await deletePersonData(instance, { ids: [userId] })
        })
    })
})
