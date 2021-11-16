import browsersync from 'rollup-plugin-browsersync'
import demoConfig from './rollup.config.demo'

demoConfig.plugins.push(
	browsersync({
		server: "public",
		port: 9001,
		open: true
	})
)

export default demoConfig
