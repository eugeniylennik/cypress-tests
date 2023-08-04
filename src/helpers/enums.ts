export enum StatusResponse {
    SUCCESS = 'success',
    ERROR = 'error'
}

export enum Catalogs {
    EDUCATION_LEVEL = 'education_level',
    EDUCATIONAL_INSTITUTIONS = 'educational_institutions',
    EDUCATION_SPECIALITIES = 'education_specialities',
    ACADEMIC_DEGREE = 'academic_degree',
    FORM_STUDY = 'form_of_study',
    OKSO = 'okso',
    USER_STATUS = 'user_status',
    IT_SKILLS = 'it_skills',
    POSITION_LEVEL = 'position_level',
    WORKERS_NUMBER = 'workers_number',
    DOCS = 'docs',
    MARITAL_STATUS = 'marital_status',
    LANGUAGES = 'languages',
    LEVEL_LANGUAGE = 'level_language',
    POLITICAL_PARTIES = 'political_parties',
    SECURITY_FORM = 'security_form',
    PROJECT_HISTORY = 'project_history',
    STAGE_HISTORY = 'stage_history',
    PROJECTS_THEMATIC_DIRECTIONS = 'projects_thematic_directions'
}

export enum EducationLevel {
    HIGHER_BACHELOR = 'Высшее образование - бакалавриат',
    FOREIGN = 'Зарубежное образование',
    SCHOOL = 'Основное общее образование'
}

export enum EducationInstitutions {
    MOY_DOP_CENTER_IT = 'МУНИЦИПАЛЬНОЕ ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ ДОПОЛНИТЕЛЬНОГО ОБРАЗОВАНИЯ ЦЕНТР ИНФОРМАЦИОННЫХ ТЕХНОЛОГИЙ'
}

export enum EducationSpecialities {
    AGRO = 'Агроинженерия'
}

export enum Address {
    MOSCOW = 'г Москва',
    ST_PETERSBURG = 'г Санкт-Петербург'
}

export enum PositionLevel {
    SPECIALIST = 'Специалист',
    WORKS_HIMSELF = 'Работаю на себя'
}

export enum WorkersNumber {
    FIFTY_THOUSANDS = 'Больше 50 000 сотрудников'
}

export enum DocType {
    PASSPORT = 'Паспорт РФ'
}

export enum MaritalStatus {
    REGISTERED_MARRIAGE = 'Состоит в зарегистрированном браке'
}

export enum Language {
    RUSSIAN = 'Русский',
    ENGLISH = 'Английский'
}

export enum LanguageLevel {
    NATIVE = 'Родной язык',
    IN_EXCELLENCE = 'В совершенстве'
}

export enum PoliticalParties {
    ROSSIA_FUTURE = 'РОССИЯ БУДУЩЕГО'
}

export enum SecurityForm {
    FIRST_FORM = 'первая форма - для граждан, допускаемых к сведениям особой важности'
}

export enum ProjectHistory {
    CP = 'Всероссийский конкурс «Цифровой прорыв»',
    FIRST_BUSINESS = 'Мой первый бизнес'
}

export enum StageHistory {
    WINNER = 'Победитель'
}

export enum FormOfStudy {
    PART_TIME = 'Очно-заочная',
    EXTRAMURAL = 'Заочная',
    FULL_TIME = 'Очная'
}
