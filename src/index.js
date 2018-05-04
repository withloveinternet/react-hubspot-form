import React from 'react'
import ReactDOM from 'react-dom'

let globalId = 0
let scriptLoaded = false

class HubspotForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.id = globalId++
		this.createForm = this.createForm.bind(this)
		this.findFormElement = this.findFormElement.bind(this)
	}
	createForm() {
		if (window.hbspt) {
			const options = {
				...this.props,
				target: `#${this.el.getAttribute(`id`)}`,
			}
			window.hbspt.forms.create(options)
			this.findFormElement()
			return true
		}
		else{
			setTimeout(this.createForm, 1)
		}
	}
	loadScript() {
		scriptLoaded = true
		const script = document.createElement(`script`)
		script.onload = this.createForm
		script.src = `//js.hsforms.net/forms/v2.js`
		document.head.appendChild(script)
	}
	findFormElement(){
		let form = this.el.querySelector(`form`)
		if(form){
			form.addEventListener(`submit`, this.props.onSubmit)
		}
		else{
			setTimeout(this.findFormElement, 1)
		}
	}
	componentDidMount() {
		if (!scriptLoaded && !this.props.noScript) {
			this.loadScript()
		}
		else {
			this.createForm()
		}
	}
	render() {
		return (
			<div id={`reactHubspotForm${this.id}`} ref={el => this.el = el} />
		)
	}
}

HubspotForm.defaultProps = {
	onSubmit: () => {}
}

export default HubspotForm