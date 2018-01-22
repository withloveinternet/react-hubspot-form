import React from 'react'
import fetch from 'isomorphic-fetch'

export default class extends React.Component {
	constructor(props){
		super(props)
		this.formSubmit = this.formSubmit.bind(this)
	}
	componentDidMount(){
		const form = this.parent.querySelector('form')
		if(form){
			form.addEventListener('submit', this.formSubmit)
		}
	}
	formSubmit(e){
		e.preventDefault()
		if(this.props.onSubmit){
			this.props.onSubmit()
		}
		// Hubspot stuff here

		let data = new FormData(e.target)
		let result = {}
		for (let entry of data.entries()) {
			result[entry[0]] = entry[1]
		}
		console.log(result)

		if(this.props.onSuccess){
			this.props.onSuccess()
		}
	}
	render(){
		return (
			<div ref={el => this.parent = el}>
				{ this.props.children }
			</div>
		)
	}
}
