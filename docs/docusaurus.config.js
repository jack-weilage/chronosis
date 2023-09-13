// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'chronosis',
	tagline: 'The fastest and smallest date manipulation library',
	// favicon: 'img/favicon.ico',

	// Set the production url of your site here
	url: 'https://chronosis.js.org/',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'jack-weilage', // Usually your GitHub org/user name.
	projectName: 'chronosis', // Usually your repo name.

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					routeBasePath: '/',
					sidebarPath: require.resolve('./sidebars.js'),
					remarkPlugins: [
						[
							require('@docusaurus/remark-plugin-npm2yarn'),
							{
								sync: true,
							},
						],
					],
					editUrl: 'https://github.com/jack-weilage/chronosis/tree/main/docs/',
				},
				blog: false,
				pages: false,
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			colorMode: {
				respectPrefersColorScheme: true,
			},
			//TODO: Replace with your project's social card
			// image: 'img/docusaurus-social-card.jpg',
			navbar: {
				logo: {
					alt: 'Chronosis logo',
					src: 'img/logo.png',
				},
				items: [
					{
						href: 'https://github.com/jack-weilage/chronosis',
						label: 'GitHub',
						position: 'right',
					},
				],
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
}

module.exports = config
