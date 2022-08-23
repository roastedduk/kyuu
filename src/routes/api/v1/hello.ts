interface Response {
	message: string
}

const response: Response = {
	message: 'Quack!'
}

export async function GET() {
	return {
		body: response
	}
}
