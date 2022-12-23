import { app } from './app'

try {
	app.listen((process.env.PORT as string) ?? 8080, () => {
		console.log('Server is running')
	})
} catch (err) {
	console.error('Error during initialization', err)
}
