import React from 'react'
import { render } from 'react-dom'
import HubspotForm from '../src/index'

const containerEl = document.createElement('div')
document.body.appendChild(containerEl)

render(
	<HubspotForm onSubmit={e => console.log('Success!')}>
		<form>
			<div>
				<input type='text' name='test' />
			</div>
			<div>
				<button>Submit</button>
			</div>
		</form>
	</HubspotForm>,
	containerEl
)