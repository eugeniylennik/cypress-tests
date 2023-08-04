export const LoginLoc = {
    TITLE: 'Вход',
    BTN_BACK: 'Вернуться на сайт',
    EMAIL: 'E-mail',
    PHONE: 'Номер телефона',
    PASSWORD: 'Пароль',
    EMAIL_ERROR_HINT: 'Укажите E-mail',
    PHONE_ERROR_HINT: 'Укажите номер телефона',
    PASSWORD_ERROR_HINT: 'Введите пароль',
    EMAIL_INCORRECT: 'Неверный формат E-mail',
    PHONE_INCORRECT: 'Неверный формат номера телефона',
    NO_ACCOUNT: 'Нет аккаунта? ',
    ACCOUNT_DELETED: 'Аккаунт удален',
    NOT_FOUND: 'Пользователь не найден'
}

export const RegistrationLoc = {
    TITLE: 'Регистрация',
    LASTNAME: 'Фамилия',
    FIRSTNAME: 'Имя',
    PATRONYMIC: 'Отчество',
    NO_PATRONYMIC: ' Нет отчества ',
    CITY: 'Город проживания',
    BIRTHDAY: 'Дата рождения',
    DAY: 'День',
    MONTH: 'Месяц',
    YEAR: 'Год',
    EMAIL: 'E-mail',
    EMAIL_ERROR_HINT: 'Неверный формат E-mail',
    PHONE: 'Номер телефона',
    PASSWORD: 'Придумайте пароль',
    CONFIRM_PASSWORD: 'Повторите пароль',
    BTN_SUBMIT: 'Зарегистрироваться',
    PASS_HINT: 'Длина пароля должна быть не менее 8 символов, ' +
        'также пароль должен содержать цифры, строчные и прописные буквы',
    ACCOUNT_DELETED: 'Аккаунт удален',
    CONFIRM_REG: 'Подтверждение регистрации',
    CONFIRM_PHONE_MESSAGE: 'Код подтверждения – это последние 4 цифры номера входящего звонка, ' +
        'отвечать на него не нужно. Звонок поступит на номер',
    CONFIRM_SMS_MESSAGE: RegExp('Сообщение №[0-9+]* с кодом отправлено на номер'),
    REPEAT_MESSAGE: (count: any) => `Отправить повторно через ${count} сек.`,
    BLOCK_MESSAGE: 'Слишком много попыток отправить код повторно. Попытайтесь позже',
    NOT_RECEIVED_MESSAGE: 'Проверьте правильность написания номера или перезагрузите телефон'
}

export const RecoveryLoc = {
    TITLE: 'Восстановление пароля',
    EMAIL: 'E-mail',
    EMAIL_ERROR_HINT: 'Укажите E-mail',
    PHONE_ERROR_HINT: 'Укажите номер телефона',
    EMAIL_INVALIDATE_MESSAGE: 'Неверный формат E-mail',
    PHONE_INVALIDATE_MESSAGE: 'Неверный формат номера телефона',
    NOT_FOUND: 'Пользователь не найден',
    CALL_PHONE_MESSAGE: 'Код подтверждения – это последние 4 цифры номера входящего звонка, ' +
        'отвечать на него не нужно. Звонок поступит на номер',
    CONFIRM_MESSAGE: RegExp('Сообщение №[0-9+]* с кодом отправлено на почту'),
    CODE_INPUT: 'Код подтверждения',
    REPEAT_TIME: RegExp('Отправить повторно через [0-9+]*'),
    REPEAT: 'Отправить повторно',
    CODE_ERROR_HINT: 'Код подтверждения указан неверно',
    PASSWORD: 'Придумайте пароль',
    CONFIRM_PASSWORD: 'Повторите пароль',
    ACCOUNT_DELETED: 'Аккаунт удален'
}

export const CountryCode = {
    RU: 'Russia (Россия): +7',
    KZ: 'Kazakhstan (Казахстан): +7',
    BY: 'Belarus (Беларусь): +375'
}

export const UserAgreement = {
    AGREEMENT: 'https://s3-cms.rsv.ru/legal/rsv/user_agreement.pdf',
    POLITIC: 'https://s3-cms.rsv.ru/legal/rsv/politic.pdf'
}
