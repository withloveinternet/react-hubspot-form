import React from 'react'
import { render } from 'react-dom'
import HubspotForm from '../src'

const containerEl = document.createElement('div')
document.body.appendChild(containerEl)

class Forms extends React.Component{
	render(){
		return(
			<div>
				<HubspotForm
					portalId='4111488'
					formId='82941100-1bbc-406e-8d63-f7232304738c'
					onSubmit={() => console.log('SUBMIT')}
				/>
				<HubspotForm
					portalId='4111488'
					formId='82941100-1bbc-406e-8d63-f7232304738c'
					onSubmit={() => console.log('SUBMIT')}
				/>
			</div>
		)
	}
}

render(
	<Forms />,
	containerEl
)

