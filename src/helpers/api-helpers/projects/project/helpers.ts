import { AxiosInstance } from 'axios'
import { tResponse } from '@data/types'
import { projectBodies } from '../../../../body-generator/projects/project/project.bodies'
import { getCatalogByType } from '../../data/data'
import { Catalogs } from '../../../enums'
import { iProject, iProjectResponse, tSeason } from '../../../../api/rsv-projects/project/project.types'
import { projects } from '../../../../api/rsv-projects/projects'

export async function upserdlProject(
    instance: AxiosInstance,
    body: iProject
): Promise<tResponse<iProjectResponse>> {
    return (await projects(instance).project.upserdlProject(body)).data
}

export async function upserdlSeason(
    instance: AxiosInstance,
    body: tSeason
): Promise<tResponse<tSeason>> {
    return (await projects(instance).project.upserdlSeason(body)).data
}

export async function createProject(
    instance: AxiosInstance
): Promise<{ project: iProjectResponse, season: tSeason }> {
    const projectsThematicDirections: number[] = [];
    //Справочник тип прокта
    (await getCatalogByType(instance, Catalogs.PROJECTS_THEMATIC_DIRECTIONS)).data.forEach((catalog) => {
        projectsThematicDirections.push(catalog.id)
    })
    const projectBody = Object.assign({}, projectBodies.defaultProjectBody(), {
        thematic_direction: projectsThematicDirections,
        admin_id: ''
    })
    const project = (await projects(instance).project.upserdlProject(projectBody)).data.data
    const seasonBody: tSeason = projectBodies.defaultSeasonBody(project.id)
    const season = (await projects(instance).project.upserdlSeason(seasonBody)).data.data
    return {
        project,
        season
    }
}
