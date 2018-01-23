import React from 'react'
import fetch from 'isomorphic-fetch'
import querystring from 'querystring'
import cookies from 'js-cookie'

export default class extends React.Component {
	constructor(props){
		super(props)
		this.formSubmit = this.formSubmit.bind(this)
	}
	componentDidMount(){
		this.form = this.parent.querySelector('form')
		if(this.form){
			this.form.addEventListener('submit', this.formSubmit)
		}
	}
	async formSubmit(e){
		e.preventDefault()

		// Run onSubmit at the same time as Hubspot code
		if(this.props.onSubmit){
			this.props.onSubmit()
		}

		let hutk = cookies.get('hubspotutk')
		if(!hutk){
			return console.log('hubspotutk not found')
		}

		// Get form data
		let data = new FormData(this.form)
		let result = {}
		for (let entry of data.entries()) {
			result[entry[0]] = entry[1]
		}
		let pageName = document.querySelector('title')
		pageName = pageName ? pageName.textContent : ''
		data = querystring.stringify({
			hs_context: JSON.stringify({
				hutk: hutk,
				pageUrl: window.location.href,
				pageName: pageName,
			}),
			...data,
		})
		try{
			let res = await fetch(`https://forms.hubspot.com/uploads/form/v2/${this.props.hubspotId}/${this.props.formId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': data.length
				},
				body: data,
			})
			console.log('RES:', res)
		}
		catch(err){
			console.log(err)
		}

		// Run onSuccess after Hubspot code
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
