import React from 'react'
import ReactDOM from 'react-dom'

let globalId = 0
let scriptLoaded = false

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
		if(scriptLoaded || this.props.noScript) return
		scriptLoaded = true
		let script = document.createElement(`script`)
		script.src = `//js.hsforms.net/forms/v2.js`
		document.head.appendChild(script)
	}
	findFormElement(){
		let form = this.el.querySelector(`form`)
		if(form){
			this.setState({ loaded: true })
			form.addEventListener(`submit`, this.onSubmit)
		}
		else{
			setTimeout(this.findFormElement, 1)
		}
	}
	onSubmit(){
		clearInterval(this.onSubmitInterval)
		this.onSubmitInterval = setInterval(() => {
			if(!this.el.querySelector(`form`)){
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
	componentDidUpdate(prevProps, prevState) {
		if (this.state.loaded && !prevState.loaded && this.props.onReady) {
			this.props.onReady(this.el);
		}
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