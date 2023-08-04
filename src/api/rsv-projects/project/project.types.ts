export interface iProject {
    admin_id?: number | null
    description?: string | null
    name?: string | null
    project_target?: string | null
    project_type?: 'contests' | 'events' | 'internship'
    site_link?: string | null
    thematic_direction?: number[] | null
    deleted?: boolean
}

export interface iProjectResponse extends iProject {
    id: number
    created_at: number
    season?: tSeason[] | null
}

export type tSeason = {
    id?: number | null
    project_id?: number,
    name?: string | null,
    description?: string | null,
    date_start?: number | null,
    date_end?: number | null,
    status?: string | null,
    actuality?: string | null,
    realization_type?: string | null,
    support_type?: [] | null,
    support_email?: string | null,
    partners?: null,
    involvement?: [] | null,
    involvement_notes?: string | null,
    awards?: [] | null,
    awards_notes?: string | null,
    allow_manual_invite?: boolean,
    nominations_headers?: string[] | null,
    team_members_min?: number | null,
    team_members_max?: number | null,
    teams?: boolean,
    members_limit?: number | null,
    reporting_group_id?: number | null,
    publication?: tPublication | null
    nominations?: tNominations[] | null
}

export type tPublication = {
    id?: number | null,
    is_draft?: boolean,
    preview?: string | null,
    big_image?: string | null,
    date_start?: number | null,
    date_end?: number | null,
    title?: string | null,
    description?: string | null,
    text?: string | null,
    hash_tags?: string[] | null
}

export type tNominations = {
    id?: number | null,
    name?: string | null,
    description?: string | null,
    target_aud_city?: [] | null,
    target_aud_age?: [] | null,
    target_aud_activity?: [] | null,
    registration_type?: string | null,
    confirmations?: [] | null,
    is_notifications_disabled?: boolean,
    is_public_registration?: boolean,
    stages?: tStage[] | null
}

export type tStage = {
    id?: number | null,
    teams?: boolean,
    status?: number | null,
    is_auto_completion?: boolean,
    auto_completion_steps_count?: number | null,
    type?: null,
    name?: string | null,
    date_start?: number | null,
    date_end?: number | null,
    is_dates_hidden?: boolean,
    description?: string | null,
    inaccessible_description?: string | null,
    active_description?: string | null,
    done_description?: string | null,
    note?: string | null,
    mentor_id?: number | null,
    kpi_expect?: number | null,
    kpi_plan?: number | null,
    awards_notes?: string | null,
    results_template_name?: string | null,
    random_steps_amount?: number | null,
    steps?: tStep[] | null
}

export type tStep = {
    id?: number | null,
    name?: string | null,
    description?: string | null,
    date_start?: number | null,
    date_end?: number | null,
    event_type?: null,
    event_button_text?: string | null,
    event_id?: number | null,
    activity_url?: string | null,
    is_claim_for_proektoria?: boolean,
    use_russian_leaders_info?: boolean,
    test_passing_score?: number | null,
    note?: string | null,
    fields?: [] | null,
    is_random?: boolean,
    experts?: [] | null
}
