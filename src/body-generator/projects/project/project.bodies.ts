import * as faker from 'faker'
import { generateTimeSuffix } from '@helpers/generate.helpers'
import { getDomain } from '@data/domains'
import dateHelper from '@helpers/date'
import dateTime from '@helpers/date'
import {
    iProject,
    tNominations,
    tPublication,
    tSeason,
    tStage,
    tStep
} from '../../../api/rsv-projects/project/project.types'

export const projectBodies: bodies = {
    defaultProjectBody:() => ({
        description: faker.lorem.paragraph(),
        name: generateTimeSuffix('Project'),
        project_target: faker.lorem.paragraph(),
        project_type: 'contests',
        site_link: `https://${getDomain()}`
    }),
    defaultSeasonBody:(projectId: number) => ({
        name: generateTimeSuffix('Season'),
        description: faker.lorem.paragraph(),
        status: 'active',
        actuality: faker.lorem.paragraph(),
        date_start: +dateTime.getDateFormat().replace(/-/g, ''),
        date_end: +dateHelper.getDateWithOffsetInYear(1).replace(/-/g, ''),
        nominations_headers: ['Номинация', 'Номинации', 'Номинацию', 'Номинации'],
        team_members_min: 2,
        team_members_max: 5,
        teams: false,
        members_limit: 1,
        allow_manual_invite: true,
        realization_type: '',
        support_type: [],
        partners: null,
        involvement: [],
        involvement_notes: '',
        awards: [],
        project_id: projectId,
        awards_notes: '',
        support_email: '',
        publication: publication.defaultPublicationBody(),
        nominations: [nominations.defaultNominationBody()],
        reporting_group_id: null
    })
}

export const publication = {
    defaultPublicationBody: (): tPublication => ({
        is_draft: true,
        preview: '',
        big_image: '',
        date_start: +dateTime.getDateFormat().replace(/-/g, ''),
        date_end: +dateHelper.getDateWithOffsetInYear(1).replace(/-/g, ''),
        title: generateTimeSuffix('Publication'),
        description: faker.lorem.paragraph(),
        text: faker.lorem.paragraph(),
        hash_tags: ['AUTO']
    })
}

export const nominations = {
    defaultNominationBody: (): tNominations => ({
        name: generateTimeSuffix('Nomination'),
        description: faker.lorem.paragraph(),
        target_aud_city: [],
        target_aud_age: [],
        target_aud_activity: [],
        registration_type: '',
        confirmations: [],
        is_notifications_disabled: false,
        is_public_registration: true,
        stages: [stages.defaultStageBody()]
    })
}

export const stages = {
    defaultStageBody: (): tStage => ({
        teams: false,
        status: 15,
        is_auto_completion: false,
        auto_completion_steps_count: 0,
        type: null,
        name: generateTimeSuffix('Stage'),
        date_start: +dateTime.getDateFormat().replace(/-/g, ''),
        date_end: +dateHelper.getDateWithOffsetInYear(1).replace(/-/g, ''),
        is_dates_hidden: false,
        description: faker.lorem.paragraph(),
        inaccessible_description: null,
        active_description: null,
        done_description: null,
        note: '',
        mentor_id: null,
        kpi_expect: 0,
        kpi_plan: 0,
        awards_notes: '',
        results_template_name: null,
        random_steps_amount: 0,
        steps: [steps.defaultStepBody()]
    })
}

export const steps = {
    defaultStepBody: (): tStep => ({
        name: generateTimeSuffix('Step'),
        description: faker.lorem.paragraph(),
        date_start: +dateTime.getDateFormat().replace(/-/g, ''),
        date_end: +dateHelper.getDateWithOffsetInYear(1).replace(/-/g, ''),
        event_type: null,
        event_button_text: '',
        event_id: null,
        activity_url: '',
        is_claim_for_proektoria: false,
        use_russian_leaders_info: false,
        test_passing_score: 0,
        note: '',
        fields: [],
        is_random: false,
        experts: []
    })
}

type bodies = {
	defaultProjectBody: () => iProject
    defaultSeasonBody: (projectId: number) => tSeason
}
