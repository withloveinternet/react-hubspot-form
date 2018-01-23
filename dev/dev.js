import React from 'react'
import { render } from 'react-dom'
import HubspotForm from '../src/index'

const containerEl = document.createElement('div')
document.body.appendChild(containerEl)

render(
	<HubspotForm
		onSubmit={e => console.log('Success!')}
		hubspotId='4111488'
		formId='d9099643-7ccf-4305-988d-cb9ff9c1468a'
		>
		<form>
			<div>
				<input type='text' name='Email' />
			</div>
			<div>
				<button>Submit</button>
			</div>
		</form>
	</HubspotForm>,
	containerEl
)