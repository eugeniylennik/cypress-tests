export type tUserCredsLogin = {
	Email: string,
	Password: string,
}

export type tLoginResponse = {
	Status: string,
	Data: tLoginDataResponse
}

export type tLoginDataResponse = {
	display_name: string,
	jwt: string,
	refresh_token: string,
	user_id: number
}

export type tUserCredsRegistration = {
	email: string,
	password: string,
	redirect_uri: string,
	first_name: string,
	second_name: string,
	patronymic: string
}

export type tRegistrationResponse = {
	Status: string,
	Data: string
}

