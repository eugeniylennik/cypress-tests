export type tCatalog = {
    id: number
    field_name: string | null
    field_value: string | null
    type: tCatalogType | null
    is_deleted: boolean
    meta?: Record<string, unknown> | null
}

export type tCatalogs = {
    catalogs: tCatalogItemShort[]
}

export type tCatalogItemShort = {
    id: number
    field_name: string | null
    field_value: string | null
}

export type tDeleteCatalog = {
    catalog_type?: string | null
    field_name?: string | null
    cancel?: boolean
}

export type tCatalogType
    = 'educational_institutions'
    | 'education_specialities'
    | 'level_language'
    | 'it_skills'
    | 'education_level'
    | 'user_status'
    | 'languages'
    | 'event_type'
    | 'specialties'
    | 'academic_degree'
    | 'workers_number'
    | 'position_level'
    | 'docs'
    | 'marital_status'
    | 'political_parties'
    | 'security_form'
    | 'project_history'
    | 'stage_history'
    | 'form_of_study'
    | 'okso'
    | 'projects_thematic_directions'

export type tAddress = {
    data: string,
    value: string,
    unrestricted_value: string,
    suggestions: string[]
}
