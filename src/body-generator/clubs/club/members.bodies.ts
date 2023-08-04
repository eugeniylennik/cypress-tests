import { iClubMembers } from '../../../api/rsv-clubs/club/club.types'

export const membersBodies: bodies = {
    defaultMembersBody:(participant:{userId: number, clubId: number}) => ({
        club: participant.clubId,
        userId: participant.userId
    })
}

type bodies = {
	defaultMembersBody:(participant:{userId: number, clubId: number}) => iClubMembers
}
