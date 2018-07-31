import React from 'react'
import ReactDOM from 'react-dom'

let globalId = 0

class HubspotForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loaded: false
		}
		this.id = globalId++
		this.createForm = this.createForm.bind(this)
		this.findFormElement = this.findFormElement.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}
	createForm() {
		if (window.hbspt) {
			// protect against component unmounting before window.hbspt is available
			if (this.el === null) {
				return
			}
			let props = {
				...this.props
			}
			delete props.loading
			delete props.onSubmit
			delete props.onReady
			let options = {
				...props,
				target: `#${this.el.getAttribute(`id`)}`,
			}
			window.hbspt.forms.create(options)
			return true
		}
		else{
			setTimeout(this.createForm, 1)
		}
	}
	loadScript() {
		let scriptLoaded = !!window.hbspt
		if(scriptLoaded || this.props.noScript) return
		scriptLoaded = true
		let script = document.createElement(`script`)
		script.src = `//js.hsforms.net/forms/v2.js`
		document.head.appendChild(script)
	}
	findFormElement(){
		// protect against component unmounting before form is added
		if (this.el === null) {
			return
		}
		let form = this.el.querySelector(`iframe`)
		if(form){
			this.setState({ loaded: true })
			form.addEventListener(`submit`, this.onSubmit)
			if (this.props.onReady) {
				this.props.onReady(form);
			}
		}
		else{
			setTimeout(this.findFormElement, 1)
		}
	}
	onSubmit(){
		clearInterval(this.onSubmitInterval)
		this.onSubmitInterval = setInterval(() => {
			if(!this.el.querySelector(`iframe`)){
				clearInterval(this.onSubmitInterval)
				if(this.props.onSubmit){
					this.props.onSubmit()
				}
			}
		}, 1)
	}
	componentDidMount() {
		this.loadScript()
		this.createForm()
		this.findFormElement()
	}
	componentWillUnmount() {
		clearInterval(this.onSubmitInterval)
	}
	render() {
		return (
			<div>
				<div
					ref={el => this.el = el}
					id={`reactHubspotForm${this.id}`}
					style={{ display: this.state.loaded ? 'block' : 'none'}}
					/>
				{!this.state.loaded && this.props.loading}
			</div>
		)
	}
}

export default HubspotForm
