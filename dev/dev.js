import React from 'react'
import { render } from 'react-dom'
import HubspotForm from '../src'

const containerEl = document.createElement('div')
document.body.appendChild(containerEl)

render(
	<HubspotForm
		portalId='4111488'
		formId='82941100-1bbc-406e-8d63-f7232304738c'
	/>,
	containerEl
)

