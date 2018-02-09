import React from 'react'

let globalId = 0
let scriptLoaded = false

export default class HubspotForm extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
		this.elId = globalId++
		this.createForm = this.createForm.bind(this)
		this.createFormInterval = this.createFormInterval.bind(this)
		this.loadScript = this.loadScript.bind(this)
	}
	createFormInterval(){
		if(!this.createForm()){
			setTimeout(this.createForm, 1)
		}
	}
	createForm(){
		if(window.hbspt){
			const options = {
				...this.props,
				target: `#reactHubspotForm${this.elId}`,
			}
			window.hbspt.forms.create(options)
			return true
		}
	}
	loadScript(){
		scriptLoaded = true
		const script = document.createElement('script')
		script.onload = this.createForm
		script.src = `//js.hsforms.net/forms/v2.js`
		document.head.appendChild(script)
	}
	componentDidMount(){
		if(!scriptLoaded && !this.props.noScript){
			this.loadScript()
		}
		else{
			this.createFormInterval()
		}
	}
	render(){
		return (
			<div id={`reactHubspotForm${this.elId}`} />
		)
	}
}
